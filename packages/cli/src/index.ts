import { generateSprite } from "./icons";
import { generateIllustrationTypes } from "./illustrations/types";
import type { CliConfig, FileConfig, Config } from "./types";
import { resolveFileConfig } from "./utils/config";
import { mergeConfigs } from "./utils/merge-config";

export type { CliConfig, FileConfig, Config };

export function defineConfig(config: FileConfig) {
  return config;
}

export async function init(cliConfig: CliConfig) {
  const fileConfig = await resolveFileConfig();
  const config = mergeConfigs({ cliConfig, fileConfig });

  await Promise.all([
    generateSprite(config),
    generateIllustrationTypes(config),
  ]);
}
