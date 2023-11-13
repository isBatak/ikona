// import fs from 'fs'
// import path from 'path'
// import prettier from 'prettier'

// import { getCommandLineArg } from '../utils/args'
// import { validatePath } from '../utils/validations'

// const inputDir = getCommandLineArg('input-dir')
// validatePath(inputDir, 'Illustrations input dir is required')

// const storyFile = getCommandLineArg('story-file')
// validatePath(storyFile, 'Story file is required')

// const illustrationsFolder = path.join(process.cwd(), inputDir)
// const illustrations: Record<string, string> = {}

// function processFolder(
//   folderPath: string,
//   targetObject: Record<string, string>
// ): void {
//   fs.readdirSync(folderPath).forEach((item) => {
//     const itemPath = path.join(folderPath, item)
//     const itemName = path.parse(item).name

//     if (fs.lstatSync(itemPath).isDirectory()) {
//       processFolder(itemPath, targetObject)
//     } else {
//       targetObject[itemName] = path
//         .relative(process.cwd(), itemPath)
//         .replace('public', '')
//     }
//   })
// }

// processFolder(illustrationsFolder, illustrations)

// const storyContent = fs.readFileSync(storyFile, 'utf8')

// const replacementString = `// [START] - storybook-illustrations-generator\nconst illustrations = ${JSON.stringify(
//   illustrations,
//   null,
//   2
// )};\n// [END] - storybook-illustrations-generator`

// const updatedStoryContent = storyContent.replace(
//   /\/\/ \[START\] - storybook-illustrations-generator[\s\S]*\/\/ \[END\] - storybook-illustrations-generator/,
//   replacementString
// )

// const prettierConfigPath = await prettier.resolveConfigFile(storyFile)
// const prettierConfig = prettierConfigPath
//   ? await prettier.resolveConfig(storyFile)
//   : undefined
// const formattedStoryContent = await prettier.format(updatedStoryContent, {
//   filepath: storyFile,
//   ...(prettierConfig ? { ...prettierConfig } : {}),
// })

// fs.writeFileSync(storyFile, formattedStoryContent, 'utf8')

console.log(
  '✅ Script executed successfully. Story file has been updated and formatted.'
);
