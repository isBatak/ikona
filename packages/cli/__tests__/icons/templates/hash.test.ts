import { hashTemplate } from "../../../src/icons/templates/hash";

describe("hash", () => {
  it("should generate hash output", () => {
    const result = hashTemplate("123456");

    expect(result).toMatchInlineSnapshot(`
        "export const hash = '123456';
        "
      `);
  });
});
