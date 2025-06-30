import { defineConfig } from "@ikona/cli";

export default defineConfig({
  verbose: false,
  icons: {
    inputDir: "src/assets/icons",
    spriteOutputDir: "public/icons",
    hash: true,
    optimize: true,
  },
  illustrations: {
    inputDir: "public/illustrations",
    extensions: ["svg", "png", "jpg", "jpeg", "webp"],
  },
});
