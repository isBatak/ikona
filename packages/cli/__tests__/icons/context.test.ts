import { createIconsContext } from "../../src/icons/context";

describe("context", () => {
  it("should generate valid context", () => {
    const result = createIconsContext({
      force: false,
      outputDir: ".ikona",
      verbose: true,
      icons: {
        inputDir: "src/assets/icons",
        spriteOutputDir: "public/icons",
        hash: true,
        optimize: true,
      },
      illustrations: {
        inputDir: "public/illustrations",
      },
      cwd: "tmp/",
    });

    expect(result.inputDir).toBe("tmp/src/assets/icons");
    expect(result.outputDir).toBe("tmp/.ikona");
    expect(result.spriteOutputDir).toBe("tmp/public/icons");
    expect(result.spriteFilepath).toBe("tmp/public/icons/sprite.svg");
    expect(result.typesDir).toBe("tmp/.ikona/types");
    expect(result.typeOutputFilepath).toBe("tmp/.ikona/types/icon-name.d.ts");
    expect(result.shouldOptimize).toBe(true);
    expect(result.shouldHash).toBe(true);
    expect(result.force).toBe(false);
  });
});
