import { generateIllustrationTypes } from "../../src/illustrations/types";
import { configFixture } from "../fixtures/config";
import { mockFs } from "../mock-fs";
import fs from "node:fs";

describe("types", () => {
  afterEach(() => {
    mockFs.restore();
  });

  it("should generate illustrations types", async () => {
    mockFs({
      [configFixture.outputDir]: {
        types: {},
      },
      [configFixture.illustrations.inputDir]: {
        "email.svg": "svg",
        "book.png": "png",
        "song.jpg": "jpg",
        "song.jpeg": "jpeg",
      },
    });

    await generateIllustrationTypes(configFixture);

    const illustrations = fs.readFileSync(
      `${configFixture.outputDir}/illustrations.ts`,
      "utf-8"
    );
    expect(illustrations).toMatchInlineSnapshot(`
      "import { IllustrationPath } from './types/illustration-path';

      export const illustrations = [
          "/illustrations/book.png",
          "/illustrations/email.svg",
          "/illustrations/song.jpeg",
          "/illustrations/song.jpg",
      ] satisfies Array<IllustrationPath>;
      "
    `);

    const types = fs.readFileSync(
      `${configFixture.outputDir}/types/illustration-path.d.ts`,
      "utf-8"
    );

    expect(types).toMatchInlineSnapshot(`
      "export type IllustrationPath =
        | '/illustrations/book.png'
        | '/illustrations/email.svg'
        | '/illustrations/song.jpeg'
        | '/illustrations/song.jpg';
      "
    `);
  });
});
