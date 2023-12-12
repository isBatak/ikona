import { generateSprite } from './icons/build';
import { generateIllustrationTypes } from './illustrations/types';
import type { CliConfig, Config } from './types';
import { resolveConfigFile } from './utils/config';

export function defineConfig(config: Config) {
  return config;
}

export async function generate(cliConfig: CliConfig) {
  const confgi = await resolveConfigFile();

  await Promise.all([
    generateSprite(cliConfig, confgi),
    generateIllustrationTypes(cliConfig, confgi),
  ]);
}

export async function studio(config: StudioCliConfig) {
  console.log(config);

  // const { build, preview, port, host, config, outdir } = cliConfig;
  // const configPath = await resolveConfigFile(config);
  // if (build) {
  //   await buildStudio({ outdir, configPath });
  // } else if (preview) {
  //   await previewStudio({ outdir });
  // } else {
  //   await serveStudio({ outdir, port, host, configPath });
  // }
}
