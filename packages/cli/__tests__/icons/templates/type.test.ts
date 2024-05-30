import { typeTemplate } from "../../../src/icons/templates/type";

describe("typeTemplate", () => {
  const iconNames = ["heart", "info", "edit"];

  it("should generate type output", () => {
    const result = typeTemplate(iconNames);

    expect(result).toMatchInlineSnapshot(`
      "export type IconName =
        | heart
        | info
        | edit;
      "
    `);
  });
});
