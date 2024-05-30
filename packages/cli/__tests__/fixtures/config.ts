import { Config } from "../../src";

export const configFixture: Config = {
  outputDir: "output",
  icons: {
    inputDir: "icons",
    spriteOutputDir: "output",
    optimize: false, // TODO fix optimize
    hash: true,
  },
  illustrations: {
    inputDir: "illustrations",
  },
  force: false,
  cwd: "",
};