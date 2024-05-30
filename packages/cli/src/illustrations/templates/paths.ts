export const pathsTemplate = (
  illustrationNames: string[]
) => `export type IllustrationPath =
  | ${illustrationNames.join("\n  | ").replace(/"/g, "'")};
`;
