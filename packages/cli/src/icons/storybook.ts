// import fs from 'fs';
// import path from 'path';
// import prettier from 'prettier';

// import { getCommandLineArg } from '../utils/args';
// import { validatePath } from '../utils/validations';

// const inputDir = getCommandLineArg('input-dir');
// validatePath(inputDir, 'Icons input dir is required');

// const storyFile = getCommandLineArg('story-file');
// validatePath(storyFile, 'Story file is required');

// const iconsFolder = path.join(process.cwd(), inputDir);
// const icons: Array<string> = [];

// function processFolder(folderPath: string, target: Array<string>): void {
// 	fs.readdirSync(folderPath).forEach((item) => {
// 		if (path.extname(item) !== '.svg') {
// 			return;
// 		}

// 		const itemPath = path.join(folderPath, item);
// 		const itemName = path.parse(item).name;

// 		if (fs.lstatSync(itemPath).isDirectory()) {
// 			processFolder(itemPath, target);
// 		} else {
// 			target.push(itemName);
// 		}
// 	});
// }

// processFolder(iconsFolder, icons);

// const storyContent = fs.readFileSync(storyFile, 'utf8');

// const replacementString = `// [START] - storybook-icons-generator\nconst icons = ${JSON.stringify(
// 	icons,
// 	null,
// 	2
// )} as const;\n// [END] - storybook-icons-generator`;

// const updatedStoryContent = storyContent.replace(
// 	/\/\/ \[START\] - storybook-icons-generator[\s\S]*\/\/ \[END\] - storybook-icons-generator/,
// 	replacementString
// );

// const prettierConfigPath = prettier.resolveConfigFile.sync(storyFile);
// const prettierConfig = prettierConfigPath ? prettier.resolveConfig.sync(storyFile) : undefined;
// const formattedStoryContent = prettier.format(updatedStoryContent, {
// 	filepath: storyFile,
// 	...(prettierConfig ? { ...prettierConfig } : {}),
// });

// fs.writeFileSync(storyFile, formattedStoryContent, 'utf8');

console.log('✅ Script executed successfully. Story file has been updated and formatted.');
