import { describe, expect, it } from "@jest/globals";
import { generateSprite } from "./generate-sprite";

describe("generate-sprite", () => {
  it("should generate icons", async () => {
    const result = await generateSprite(
      {},
      {
        outputDir: "packages/cli/__tests__/.ikona",
        icons: {
          optimize: false,
          inputDir: "packages/cli/__tests__/samples/icons",
          spriteOutputDir: "packages/cli/__tests__/output/icons",
          hash: true,
        },
        illustrations: {
          inputDir: "packages/cli/__tests__/samples/illustrations",
        },
      }
    );

    expect(result).toMatchInlineSnapshot(`undefined`);
  });
});
