import { illustrationsTemplate } from "../../../src/illustrations/templates/illustrations";

describe("illustrationsTemplate", () => {
  const illustrationNames = ["email", "book", "song"];

  it("should generate illustrations template", () => {
    const result = illustrationsTemplate(illustrationNames);

    expect(result).toMatchInlineSnapshot(`
      "import { IllustrationPath } from './types/illustration-path';

      export const illustrations = [
          email,
          book,
          song,
      ] satisfies Array<IllustrationPath>;
      "
    `);
  });
});
