import { iconsTemplate } from "../src/icons/templates/icons";
import { typeTemplate } from "../src/icons/templates/type";
import { hashTemplate } from "../src/icons/templates/hash";

import { illustrationsTemplate } from "../src/illustrations/templates/illustrations";
import { pathsTemplate } from "../src/illustrations/templates/paths";

describe("templates", () => {
  describe("icons", () => {
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

    it("should generate hash output", () => {
      const result = hashTemplate("123456");

      expect(result).toMatchInlineSnapshot(`
        "export const hash = '123456';
        "
      `);
    });
  });

  describe("illustrations", () => {
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
});
