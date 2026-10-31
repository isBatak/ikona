export const iconsTemplate = (
  iconNames: string[]
) => `import type { IconName } from './types/icon-name';

    export const icons = [
      ${iconNames.join(',\n      ')},
    ] satisfies Array<IconName>;
  `;
