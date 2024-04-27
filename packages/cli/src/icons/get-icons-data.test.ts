import { getIconsData } from "./get-icons-data";
import fs from "fs-extra";

jest.mock("fs-extra", () => ({
  readFileSync: jest.fn(),
}));

const heartIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

describe("get-icons-data", () => {
  it("should load icons data form the inputDir", async () => {
    const files = ["heart.svg"];
    const inputDir = "/path/to/inputDir";

    (fs.readFileSync as jest.Mock).mockReturnValue(heartIcon);

    const result = getIconsData(files, inputDir);

    expect(fs.readFileSync).toHaveBeenCalledWith(
      "/path/to/inputDir/heart.svg",
      "utf8"
    );

    expect(result).toMatchInlineSnapshot(`
      [
        {
          "content": "<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>",
          "name": "heart",
        },
      ]
    `);
  });
});
