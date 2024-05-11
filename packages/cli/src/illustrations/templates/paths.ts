export const pathsTemplate = (
  illustrationNames: string[]
) => `export type IllustrationPath =
\t| ${illustrationNames.join("\n\t| ").replace(/"/g, "'")};
`;
