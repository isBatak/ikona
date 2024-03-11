import crypto from 'crypto';
import fsExtra from 'fs-extra';
import { glob } from 'glob';
import { parse } from 'node-html-parser';
import * as path from 'node:path';
import { writeIfChanged } from '../utils/validations';
import type { CliConfig, Config } from '../types';
import { defaultConfig } from '../utils/config';
import { loadConfig, optimize } from 'svgo';
import { calculateFileSizeInKB } from '../utils/file';

interface GenerateIconFilesOptions {
  files: Array<string>;
  inputDir: string;
  outputDir: string;
  spriteOutputDir: string;
  shouldOptimize?: boolean;
  shouldHash?: boolean;
  force?: boolean;
}

async function generateIconFiles({
  files,
  inputDir,
  outputDir,
  spriteOutputDir,
  shouldOptimize,
  shouldHash,
  force,
}: GenerateIconFilesOptions) {
  const spriteFilepath = path.join(spriteOutputDir, 'sprite.svg');
  const typeOutputFilepath = path.join(outputDir, 'types', 'icon-name.d.ts');
  const currentSprite = await fsExtra
    .readFile(spriteFilepath, 'utf8')
    .catch(() => '');
  const currentTypes = await fsExtra
    .readFile(typeOutputFilepath, 'utf8')
    .catch(() => '');

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

  let output = await generateSvgSprite({
    files,
    inputDir,
  });

  if (shouldOptimize) {
    const config = (await loadConfig()) || undefined;
    output = optimize(output, config).data;
  }

  let hash;
  if (shouldHash) {
    hash = crypto.createHash('md5').update(output).digest('hex');
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
      console.log('✅', file);
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
  const typeOutputContent = `export type IconName =
\t| ${stringifiedIconNames.join('\n\t| ').replace(/"/g, "'")};
`;
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
  const iconsOutputFilepath = path.join(outputDir, 'icons.ts');
  const iconsOutputContent = `import { IconName } from './types/icon-name';

export const icons = [
\t${stringifiedIconNames.join(',\n\t')},
] satisfies Array<IconName>;
`;
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
  if (shouldHash) {
    const hashOutputFilepath = path.join(outputDir, 'hash.ts');
    const hashFileContent = `export const hash = '${hash}';\n`;
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

function iconName(file: string) {
  return file.replace(/\.svg$/, '').replace(/\\/g, '/');
}

/**
 * Creates a single SVG file that contains all the icons
 */
async function generateSvgSprite({
  files,
  inputDir,
}: {
  files: Array<string>;
  inputDir: string;
}) {
  // Each SVG becomes a symbol and we wrap them all in a single SVG
  const symbols = await Promise.all(
    files.map(async (file) => {
      const svgPath = path.join(inputDir, file);
      const input = await fsExtra.readFile(svgPath, 'utf8');
      const root = parse(input);

      const svg = root.querySelector('svg');
      if (!svg) throw new Error('No SVG element found');

      svg.tagName = 'symbol';
      svg.setAttribute('id', iconName(file));
      svg.removeAttribute('xmlns');
      svg.removeAttribute('xmlns:xlink');
      svg.removeAttribute('version');
      svg.removeAttribute('width');
      svg.removeAttribute('height');

      return svg.toString().trim();
    })
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">`,
    `<defs>`, // for semantics: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
    ...symbols,
    `</defs>`,
    `</svg>`,
    '', // trailing newline
  ].join('\n');
}

export async function generateSprite(cliConfig: CliConfig, config: Config) {
  const outputDir =
    cliConfig['out-dir'] || config.outputDir || defaultConfig.outputDir;
  const { icons, force } = config;
  const { inputDir, spriteOutputDir, optimize, hash } = icons;

  const cwd = process.cwd();
  console.log('CWD', cwd);

  const inputDirRelative = path.relative(cwd, inputDir);
  const outputDirRelative = path.join(cwd, outputDir);
  const spriteOutputDirRelative = path.join(cwd, spriteOutputDir);

  await Promise.all([
    fsExtra.ensureDir(inputDirRelative),
    fsExtra.ensureDir(outputDirRelative),
    fsExtra.ensureDir(spriteOutputDirRelative),
  ]);

  const files = glob
    .sync('**/*.svg', {
      cwd: inputDirRelative,
    })
    .sort((a, b) => a.localeCompare(b));

  if (files.length === 0) {
    console.log(`No SVG files found in ${inputDirRelative}`);
  } else {
    await generateIconFiles({
      files,
      inputDir: inputDirRelative,
      outputDir: outputDirRelative,
      spriteOutputDir: spriteOutputDirRelative,
      shouldOptimize: cliConfig.optimize || optimize,
      shouldHash: cliConfig.hash || hash,
      force: cliConfig.force || force,
    });
  }
}
