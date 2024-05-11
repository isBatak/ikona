export const iconsTemplate = (
  iconNames: string[]
) => `import { IconName } from './types/icon-name';
    
    export const icons = [
    \t${iconNames.join(",\n\t")},
    ] satisfies Array<IconName>;
  `;
