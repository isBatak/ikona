export const iconsTemplate = (
  iconNames: string[]
) => `import { IconName } from './types/icon-name';

    export const icons = [
      ${iconNames.join(",\n      ")},
    ] satisfies Array<IconName>;
  `;
