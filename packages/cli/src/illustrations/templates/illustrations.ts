export const illustrationsTemplate = (
  illustrationNames: string[]
) => `import { IllustrationPath } from './types/illustration-path';

export const illustrations = [
    ${illustrationNames.join(",\n    ")},
] satisfies Array<IllustrationPath>;
`;
