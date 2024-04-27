import { generateSvgSprite } from "./generate-svg-sprite";

import fsExtra from "fs-extra";

const heartIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

describe("generate-svg-sprite", () => {
  it("should generate sprite", async () => {
    const fileName = "heart.svg";
    const iconsDir = "packages/cli/__tests__/samples/icons";

    // @ts-expect-error mock
    jest.spyOn(fsExtra, "readFile").mockResolvedValue(heartIcon);

    const result = await generateSvgSprite({
      files: [fileName],
      inputDir: iconsDir,
    });

    expect(fsExtra.readFile).toHaveBeenCalledWith(
      "packages/cli/__tests__/samples/icons/heart.svg",
      "utf8"
    );
    expect(result).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="UTF-8"?>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">
      <defs>
      <symbol viewBox="0 0 24 24" id="heart"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></symbol>
      </defs>
      </svg>
      "
    `);
  });
});
