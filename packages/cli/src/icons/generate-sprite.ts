import fsExtra from "fs-extra";
import { glob } from "glob";
import type { Config } from "../types";
import { generateIconFiles } from "./generate-icon-files";
import { createIconsContext } from "./context";

export async function generateSprite(config: Config) {
  const context = createIconsContext(config);

  await Promise.all([
    fsExtra.ensureDir(context.inputDir),
    fsExtra.ensureDir(context.outputDir),
    fsExtra.ensureDir(context.spriteOutputDir),
  ]);

  const files = glob
    .sync("**/*.svg", {
      cwd: context.inputDir,
    })
    .sort((a, b) => a.localeCompare(b));

  if (files.length === 0) {
    console.log(`No SVG files found in ${context.inputDir}`);
  } else {
    await generateIconFiles({ files, context });
  }
}
