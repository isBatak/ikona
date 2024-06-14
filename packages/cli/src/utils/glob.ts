export function getIllustrationsExtensionsGlobPattern(extensions: string[]) {
  return `**/*.{${extensions.join(",")}}`;
}
