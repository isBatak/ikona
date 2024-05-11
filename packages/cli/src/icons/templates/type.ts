export const typeTemplate = (iconNames: string[]) => `export type IconName =
  \t| ${iconNames.join("\n\t| ").replace(/"/g, "'")};
`;
