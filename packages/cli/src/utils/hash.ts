export function addHashToSpritePath(path: string, hash?: string) {
  return path.replace(/\.svg$/, `.${hash}.svg`);
}
