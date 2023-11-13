import { type Config } from './cli';
import { resolveConfigFile } from './utils/config';
import { mergeAndConcat } from 'merge-anything';

export function defineConfig(config: Config) {
  return config;
}

export async function init(config: Config) {
  const c = await resolveConfigFile();

  const finalConfig = mergeAndConcat(c, config);
  const isVerbose = finalConfig.verbose;

  console.log(finalConfig);
  console.log(isVerbose);
}
