import { bundleNRequire } from "bundle-n-require";
import findUp from "escalade/sync";
import { resolve } from "path";
import { Config } from "../types";

export const defaultConfig: Config = {
  verbose: false,
  outputDir: ".ikona",
  force: false,
  icons: {
    optimize: false,
    inputDir: "icons",
    spriteOutputDir: "output",
    hash: false,
  },
  illustrations: {
    inputDir: "illustrations",
    extensions: ["svg", "png", "jpg", "jpeg", "webp"],
  },
  cwd: process.cwd(),
};

const configs = [".ts", ".js", ".mts", ".mjs", ".cts", ".cjs"];
const configRegex = new RegExp(`ikona.config(${configs.join("|")})$`);
const isConfig = (file: string) => configRegex.test(file);

export function findConfigFile({ cwd, file }: { cwd: string; file?: string }) {
  if (file) return resolve(cwd, file);

  return findUp(cwd, (_dir, paths) => {
    return paths.find(isConfig);
  });
}

async function bundle(filepath: string, cwd: string) {
  const { mod: config, dependencies } = await bundleNRequire(filepath, {
    cwd,
    interopDefault: true,
  });

  return { config: config?.default ?? config, dependencies };
}

export const resolveFileConfig = async () => {
  const currentDir = process.cwd();
  const filePath = findConfigFile({ cwd: currentDir });

  if (!filePath) {
    throw new Error("Config file not found");
  }

  const { config } = await bundle(filePath, currentDir);

  return config;
};
