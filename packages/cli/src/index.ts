import { generateSprite } from './icons/build';
import { generateIllustrationTypes } from './illustrations/types';
import type { CliConfig, Config } from './types';
import { resolveConfigFile } from './utils/config';

export function defineConfig(config: Config) {
  return config;
}

export async function init(cliConfig: CliConfig) {
  const confgi = await resolveConfigFile();

  await Promise.all([
    generateSprite(cliConfig, confgi),
    generateIllustrationTypes(cliConfig, confgi),
  ]);
}
