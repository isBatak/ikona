import fsExtra from 'fs-extra';
import { glob } from 'glob';
import * as path from 'node:path';
import type { CliConfig, Config } from '../types';
import { defaultConfig } from '../utils/config';
import { generateIconFiles } from './generate-icon-files';

export async function generateSprite(cliConfig: CliConfig, config: Config) {
  const outputDir =
    cliConfig['out-dir'] || config.outputDir || defaultConfig.outputDir;
  const { icons, force } = config;
  const { inputDir, spriteOutputDir, optimize, hash } = icons;

  const cwd = process.cwd();

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
