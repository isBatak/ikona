import { Config } from "../../src";

export const configFixture: Config = {
  verbose: false,
  outputDir: "output",
  icons: {
    inputDir: "icons",
    spriteOutputDir: "output",
    optimize: true,
    hash: true,
  },
  illustrations: {
    inputDir: "illustrations",
    extensions: ["svg", "png", "jpg", "jpeg", "webp"],
  },
  force: false,
  cwd: "",
};
