export const typeTemplate = (iconNames: string[]) => `export type IconName =
  | ${iconNames.join("\n  | ").replace(/"/g, "'")};
`;
