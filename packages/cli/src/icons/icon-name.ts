export function iconName(file: string) {
  return file.replace(/\.svg$/, '').replace(/\\/g, '/');
}
