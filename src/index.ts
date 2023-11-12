import { Options } from './cli'
import { resolveConfigFile } from './utils/config'

const defaultOptions: Options = {
  verbose: false,
}

export function defineConfig(options: Options): Options {
  return {
    ...defaultOptions,
    ...options,
  }
}

export async function init(options: Options) {
  const isVerbose = options.verbose

  const config = await resolveConfigFile()

  console.log(config)
  console.log(isVerbose)
}
