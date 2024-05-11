import { mergeConfigs } from "../../src/utils/merge-config";

describe("merge-config", () => {
  it("should prefer cli config over file config", () => {
    const result = mergeConfigs({
      cliConfig: {
        verbose: true,
        "out-dir": "tmp/",
        force: true,
        optimize: false,
        hash: false,
      },
      fileConfig: {
        verbose: false,
        force: false,
        icons: {
          inputDir: "src/assets/icons",
          spriteOutputDir: "public/icons",
          hash: true,
          optimize: true,
        },
        illustrations: {
          inputDir: "public/illustrations",
        },
      },
    });

    expect(result.verbose).toBe(true);
    expect(result.outputDir).toBe("tmp/");
    expect(result.force).toBe(true);
    expect(result.icons.optimize).toBe(false);
    expect(result.icons.hash).toBe(false);
  });

  it("should use default config for `outputDir` and `cwd` if cli or file config are not provided", () => {
    const result = mergeConfigs({
      cliConfig: {},
      fileConfig: {
        verbose: false,
        icons: {
          inputDir: "src/assets/icons",
          spriteOutputDir: "public/icons",
          hash: true,
          optimize: true,
        },
        illustrations: {
          inputDir: "public/illustrations",
        },
      },
    });

    expect(result.outputDir).toBe(".ikona");
    expect(result.cwd).toBe(process.cwd());
  });
});
