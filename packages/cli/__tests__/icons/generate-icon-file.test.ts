import { mockFs } from "../mock-fs";
import { generateIconFiles } from "../../src/icons/generate-icon-files";
import { createIconsContext } from "../../src/icons/context";
import fs from "fs";
import { addHashToSpritePath } from "../../src/utils/hash";
import { heartIcon } from "../fixtures/icons";
import { configFixture } from "../fixtures/config";

describe("generateIconFiles", () => {
  const files = ["icon1.svg", "icon2.svg"];
  const root = {
    output: {
      types: {},
    },
    "icons/icon1.svg": heartIcon,
    "icons/icon2.svg": heartIcon,
  };

  afterEach(() => {
    mockFs.restore();
  });

  it("should generate icon files and write changes to the file system", async () => {
    const context = createIconsContext({
      ...configFixture,
      icons: {
        ...configFixture.icons,
        optimize: false,
      },
    });

    mockFs(root);

    const { hash } = await generateIconFiles({ files, context });

    const spritePath = hash
      ? addHashToSpritePath(context.spriteFilepath, hash)
      : context.spriteFilepath;

    const spriteContent = fs.readFileSync(spritePath, "utf-8");
    expect(spriteContent).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="UTF-8"?>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 0 0" width="0" height="0">
      <defs>
      <symbol viewBox="0 0 24 24" id="icon1"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></symbol>
      <symbol viewBox="0 0 24 24" id="icon2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></symbol>
      </defs>
      </svg>
      "
    `);

    const typesContent = fs.readFileSync(context.typeOutputFilepath, "utf-8");
    expect(typesContent).toMatchInlineSnapshot(`
      "export type IconName =
        | 'icon1'
        | 'icon2';
      "
    `);

    const iconsContent = fs.readFileSync(context.iconsPath, "utf-8");
    expect(iconsContent).toMatchInlineSnapshot(`
      "import { IconName } from './types/icon-name';

          export const icons = [
            "icon1",
            "icon2",
          ] satisfies Array<IconName>;
        "
    `);

    const hashContent = fs.readFileSync(context.hashPath, "utf-8");
    expect(hashContent).toMatchInlineSnapshot(`
      "export const hash = '${hash}';
      "
    `);
  });

  it("should generate and optimize sprite", async () => {
    const context = createIconsContext({
      ...configFixture,
      icons: {
        ...configFixture.icons,
        optimize: true,
      },
    });

    mockFs(root);

    const { hash } = await generateIconFiles({ files, context });

    const spritePath = hash
      ? addHashToSpritePath(context.spriteFilepath, hash)
      : context.spriteFilepath;

    const spriteContent = fs.readFileSync(spritePath, "utf-8");
    expect(spriteContent).toMatchInlineSnapshot(`
      "<?xml version="1.0" encoding="UTF-8"?>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 0 0" width="0" height="0">
      <defs>
      <symbol viewBox="0 0 24 24" id="icon1">
        <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"></path>
      </symbol>
      <symbol viewBox="0 0 24 24" id="icon2">
        <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"></path>
      </symbol>
      </defs>
      </svg>
      "
    `);
  });
});
