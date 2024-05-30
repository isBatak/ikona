import { Config } from "..";
import { CliConfig, FileConfig } from "../types";
import { defaultConfig } from "./config";

export interface MergeConfigProps {
  cliConfig: CliConfig;
  fileConfig: FileConfig;
}

export const mergeConfigs = ({ cliConfig, fileConfig }: MergeConfigProps) => {
  return {
    verbose: cliConfig.v ?? cliConfig.verbose ?? fileConfig.verbose,
    outputDir:
      cliConfig["out-dir"] ?? fileConfig.outputDir ?? defaultConfig.outputDir,
    force: cliConfig.force ?? fileConfig.force,
    icons: {
      optimize: cliConfig.optimize ?? fileConfig.icons.optimize,
      inputDir: fileConfig.icons.inputDir, // TODO add missing cli config flag
      spriteOutputDir: fileConfig.icons.spriteOutputDir, // TODO add missing cli config flag
      hash: cliConfig.hash ?? fileConfig.icons.hash,
    },
    illustrations: {
      inputDir: fileConfig.illustrations.inputDir, // TODO add missing cli config flag
    },
    cwd: cliConfig.cwd ?? fileConfig.cwd ?? defaultConfig.cwd,
  } satisfies Config;
};
