import { type Config } from './cli';
import { generateSprite } from './icons/build';
import { generateIllustrationTypes } from './illustrations/types';
import { resolveConfigFile } from './utils/config';
import { mergeAndConcat } from 'merge-anything';

export function defineConfig(config: Config) {
  return config;
}

export async function init(cliConfig: Config) {
  const fileConfig = await resolveConfigFile();

  const config = mergeAndConcat(fileConfig, cliConfig);

  await Promise.all([
    generateSprite(config),
    generateIllustrationTypes(config),
  ]);
}
