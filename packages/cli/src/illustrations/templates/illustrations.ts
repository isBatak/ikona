export const illustrationsTemplate = (
  illustrationNames: string[]
) => `import { IllustrationPath } from './types/illustration-path';

export const illustrations = [
\t${illustrationNames.join(",\n\t")},
] satisfies Array<IllustrationPath>;
`;
