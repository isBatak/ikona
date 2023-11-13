import { bundleNRequire } from 'bundle-n-require';
import findUp from 'escalade/sync';
import { resolve } from 'path';

const configs = ['.ts', '.js', '.mts', '.mjs', '.cts', '.cjs'];
const configRegex = new RegExp(`fanta.config(${configs.join('|')})$`);
const isConfig = (file: string) => configRegex.test(file);

export function findConfigFile({ cwd, file }: { cwd: string; file?: string }) {
  if (file) return resolve(cwd, file);

  return findUp(cwd, (_dir, paths) => {
    return paths.find(isConfig);
  });
}

async function bundle(filepath: string, cwd: string) {
  const { mod: config, dependencies } = await bundleNRequire(filepath, {
    cwd,
    interopDefault: true,
  });

  return { config: config?.default ?? config, dependencies };
}

export const resolveConfigFile = async () => {
  const currentDir = process.cwd();
  const filePath = findConfigFile({ cwd: currentDir });

  if (!filePath) {
    throw new Error('Config file not found');
  }

  const { config } = await bundle(filePath, currentDir);

  return config;
};
