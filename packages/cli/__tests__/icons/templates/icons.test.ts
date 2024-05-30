import { iconsTemplate } from "../../../src/icons/templates/icons";

describe("iconsTemplate", () => {
  const iconNames = ["heart", "info", "edit"];

  it("should generate icons output", () => {
    const result = iconsTemplate(iconNames);

    expect(result).toMatchInlineSnapshot(`
      "import { IconName } from './types/icon-name';

          export const icons = [
            heart,
            info,
            edit,
          ] satisfies Array<IconName>;
        "
    `);
  });
});
