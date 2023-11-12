import path from 'path'

const configFileName = 'fanta.config.js'

export const resolveConfigFile = async () => {
  let config = {}

  let currentDir = process.cwd()
  let previousDir = ''

  while (currentDir !== previousDir) {
    const configPath = path.join(currentDir, configFileName)

    try {
      config = await import(configPath)
      break
    } catch (e) {
      console.log('e', e)
      previousDir = currentDir
      currentDir = path.join(currentDir, '..')
    }
  }

  return config
}
