import { Config } from "..";
import { CliConfig, FileConfig } from "../types";
import { defaultConfig } from "./config";

export interface MergeConfigProps {
  cliConfig: CliConfig;
  fileConfig: FileConfig;
}

export const mergeConfigs = ({ cliConfig, fileConfig }: MergeConfigProps) => {
  return {
    verbose:
      cliConfig.v ??
      cliConfig.verbose ??
      fileConfig.verbose ??
      defaultConfig.verbose,
    outputDir:
      cliConfig["out-dir"] ?? fileConfig.outputDir ?? defaultConfig.outputDir,
    force: cliConfig.force ?? fileConfig.force ?? defaultConfig.force,
    icons: {
      optimize:
        cliConfig.optimize ??
        fileConfig.icons?.optimize ??
        defaultConfig.icons.optimize,
      inputDir: fileConfig.icons?.inputDir ?? defaultConfig.icons.inputDir, // TODO add missing cli config flag
      spriteOutputDir:
        fileConfig.icons?.spriteOutputDir ??
        defaultConfig.icons.spriteOutputDir, // TODO add missing cli config flag
      hash:
        cliConfig.hash ?? fileConfig.icons?.hash ?? defaultConfig.icons.hash,
    },
    illustrations: {
      inputDir:
        fileConfig.illustrations?.inputDir ??
        defaultConfig.illustrations.inputDir, // TODO add missing cli config flag
      extensions:
        fileConfig.illustrations?.extensions ??
        defaultConfig.illustrations.extensions, // TODO add missing cli config flag
    },
    cwd: cliConfig.cwd ?? fileConfig.cwd ?? defaultConfig.cwd,
  } satisfies Config;
};
