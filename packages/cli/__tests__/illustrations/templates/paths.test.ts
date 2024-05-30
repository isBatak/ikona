import { pathsTemplate } from "../../../src/illustrations/templates/paths";

describe("pathsTemplate", () => {
  const illustrationNames = ["email", "book", "song"];

  it("should generate paths template", () => {
    const result = pathsTemplate(illustrationNames);

    expect(result).toMatchInlineSnapshot(`
      "export type IllustrationPath =
        | email
        | book
        | song;
      "
    `);
  });
});
