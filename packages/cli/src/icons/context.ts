import * as path from "node:path";
import { Config } from "../types";

export interface CreateIconContextProps {
  outputDir: string;
  spriteOutputDir: string;
}

export const createIconsContext = (config: Omit<Config, "illustrations">) => {
  const { outputDir, icons, force, cwd } = config;

  const inputDirRelative = path.join(cwd, icons.inputDir);
  const outputDirRelative = path.join(cwd, outputDir);
  const spriteOutputDirRelative = path.join(cwd, icons.spriteOutputDir);

  const spriteFilepath = path.join(cwd, icons.spriteOutputDir, "sprite.svg");
  const typesDir = path.join(cwd, outputDir, "types");
  const typeOutputFilepath = path.join(typesDir, "icon-name.d.ts");
  const iconsPath = path.join(cwd, outputDir, "icons.ts");
  const hashPath = path.join(cwd, outputDir, "hash.ts");

  return {
    inputDir: inputDirRelative,
    outputDir: outputDirRelative,
    spriteOutputDir: spriteOutputDirRelative,
    spriteFilepath,
    typesDir,
    typeOutputFilepath,
    iconsPath,
    hashPath,
    shouldOptimize: icons.optimize,
    shouldHash: icons.hash,
    force,
  };
};
