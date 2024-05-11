import crypto from "crypto";
import fsExtra from "fs-extra";
import * as path from "node:path";
import { writeIfChanged } from "../utils/validations";
import { loadConfig, optimize } from "svgo";
import { calculateFileSizeInKB } from "../utils/file";
import { generateSvgSprite } from "./generate-svg-sprite";
import { iconName } from "./icon-name";
import { getIconsData } from "./get-icons-data";
import { typeTemplate } from "./templates/type";
import { iconsTemplate } from "./templates/icons";
import { hashTemplate } from "./templates/hash";
import { createIconsContext } from "./context";

interface GenerateIconFilesOptions {
  files: Array<string>;
  context: ReturnType<typeof createIconsContext>;
}

export async function generateIconFiles({
  files,
  context,
}: GenerateIconFilesOptions) {
  const {
    spriteFilepath,
    typesDir,
    typeOutputFilepath,
    inputDir,
    shouldOptimize,
    shouldHash,
    force,
    outputDir,
  } = context;

  await fsExtra.ensureDir(typesDir);

  const currentSprite = await fsExtra
    .readFile(spriteFilepath, "utf8")
    .catch(() => "");
  const currentTypes = await fsExtra
    .readFile(typeOutputFilepath, "utf8")
    .catch(() => "");

  const iconNames = files.map((file) => iconName(file));

  const spriteUpToDate = iconNames.every((name) =>
    currentSprite.includes(`id=${name}`)
  );
  const typesUpToDate = iconNames.every((name) =>
    currentTypes.includes(`"${name}"`)
  );

  if (spriteUpToDate && typesUpToDate) {
    console.log(`Icons are up to date`);
    return;
  }

  const iconsData = getIconsData(files, inputDir);

  let output = generateSvgSprite(iconsData);

  if (shouldOptimize) {
    const config = (await loadConfig()) || undefined;
    output = optimize(output, config).data;
  }

  let hash;
  if (shouldHash) {
    hash = crypto.createHash("md5").update(output).digest("hex");
  }

  const spriteChanged = await writeIfChanged({
    filepath: spriteFilepath,
    newContent: output,
    hash,
    force,
  });

  if (spriteChanged) {
    console.log(`Generating sprite for ${inputDir}`);
    for (const file of files) {
      console.log("✅", file);
    }
    console.log(`File size: ${calculateFileSizeInKB(output)} KB`);

    if (shouldHash) {
      console.log(`Generated sprite with hash ${hash}`);
      console.log(
        `Saved to ${path.relative(
          process.cwd(),
          spriteFilepath.replace(/\.svg$/, `.${hash}.svg`)
        )}`
      );
    } else {
      console.log(`Saved to ${path.relative(process.cwd(), spriteFilepath)}`);
    }
  }

  /** Types export */
  const stringifiedIconNames = iconNames.map((name) => JSON.stringify(name));
  const typeOutputContent = typeTemplate(stringifiedIconNames);
  const typesChanged = await writeIfChanged({
    filepath: typeOutputFilepath,
    newContent: typeOutputContent,
    force,
  });

  if (typesChanged) {
    console.log(
      `Types saved to ${path.relative(process.cwd(), typeOutputFilepath)}`
    );
  }

  /** Export icon names */
  const iconsOutputFilepath = path.join(outputDir, "icons.ts");
  const iconsOutputContent = iconsTemplate(stringifiedIconNames);
  const iconsChanged = await writeIfChanged({
    filepath: iconsOutputFilepath,
    newContent: iconsOutputContent,
    force,
  });

  if (iconsChanged) {
    console.log(
      `Icons names saved to ${path.relative(
        process.cwd(),
        iconsOutputFilepath
      )}`
    );
  }

  /** Hash file export */
  if (shouldHash && hash) {
    const hashOutputFilepath = path.join(outputDir, "hash.ts");
    const hashFileContent = hashTemplate(hash);
    const hashFileChanged = await writeIfChanged({
      filepath: hashOutputFilepath,
      newContent: hashFileContent,
      force,
    });

    if (hashFileChanged) {
      console.log(
        `Hash file saved to ${path.relative(process.cwd(), hashOutputFilepath)}`
      );
    }
  }

  /** Log */
  if (spriteChanged || typesChanged || iconsChanged) {
    console.log(`Generated ${files.length} icons`);
  } else {
    console.log(`Icons are up to date`);
  }
}
