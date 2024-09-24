import { svgSpriteTemplate } from "../../../src/icons/templates/svg-sprite";
import { heartIcon } from "../../fixtures/icons";

describe("svgSpriteTemplate", () => {
  it("should generate sprite", () => {
    const result = svgSpriteTemplate([
      {
        content: heartIcon,
        name: "heart",
      },
    ]);

    expect(result).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="UTF-8"?>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 0 0" width="0" height="0">
      <defs>
      <symbol viewBox="0 0 24 24" id="heart"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></symbol>
      </defs>
      </svg>
      "
    `);
  });

  it("should throw an error icons data is not SVG", () => {
    expect(() =>
      svgSpriteTemplate([{ content: "not svg", name: "heart" }])
    ).toThrowErrorMatchingInlineSnapshot(`"No SVG element found"`);
  });
});
