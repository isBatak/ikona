import crypto from 'crypto';
import fsExtra from 'fs-extra';
import { glob } from 'glob';
import { parse } from 'node-html-parser';
import * as path from 'node:path';
import { writeIfChanged } from '../utils/validations';
import type { Config } from "../cli";
import { defaultConfig } from '../utils/config';


async function generateIconFiles({ files, inputDir, outputDir, spriteOutputDir }: { files: Array<string>; inputDir: string, outputDir: string, spriteOutputDir: string }) {
	const spriteFilepath = path.join(spriteOutputDir, 'sprite.svg');
	const typeOutputFilepath = path.join(outputDir, 'types', 'icon-name.d.ts');
	const currentSprite = await fsExtra.readFile(spriteFilepath, 'utf8').catch(() => '');
	const currentTypes = await fsExtra.readFile(typeOutputFilepath, 'utf8').catch(() => '');

	const iconNames = files.map((file) => iconName(file));

	const spriteUpToDate = iconNames.every((name) => currentSprite.includes(`id=${name}`));
	const typesUpToDate = iconNames.every((name) => currentTypes.includes(`"${name}"`));

	if (spriteUpToDate && typesUpToDate) {
		console.log(`Icons are up to date`);
		return;
	}

	console.log(`Generating sprite for ${inputDir}`);

	const output = await generateSvgSprite({
		files,
		inputDir,
	});

	const hash = crypto.createHash('md5').update(output).digest('hex');

	console.log(`Generated sprite with hash ${hash}`);

	const spriteChanged = await writeIfChanged(spriteFilepath, output, hash);

	for (const file of files) {
		console.log('✅', file);
	}

	console.log(`Saved to ${path.relative(process.cwd(), spriteFilepath)}`);

	const stringifiedIconNames = iconNames.map((name) => JSON.stringify(name));

	const typeOutputContent = `
export type IconName =
\t| ${stringifiedIconNames.join('\n\t| ').replace(/"/g, "'")};
`;

	const typesChanged = await writeIfChanged(typeOutputFilepath, typeOutputContent);

	console.log(`Manifest saved to ${path.relative(process.cwd(), typeOutputFilepath)}`);


	const svgUseComponent = await writeIfChanged(
		path.join(outputDir, 'hash.ts'),
`
export const hash = '${hash}';\n`
	);

	if (spriteChanged || typesChanged || svgUseComponent) {
		console.log(`Generated ${files.length} icons`);
	}
}

function iconName(file: string) {
	return file.replace(/\.svg$/, '').replace(/\\/g, '/');
}

/**
 * Creates a single SVG file that contains all the icons
 */
async function generateSvgSprite({ files, inputDir }: { files: Array<string>; inputDir: string }) {
	// Each SVG becomes a symbol and we wrap them all in a single SVG
	const symbols = await Promise.all(
		files.map(async (file) => {
			const input = await fsExtra.readFile(path.join(inputDir, file), 'utf8');
			const root = parse(input);

			const svg = root.querySelector('svg');
			if (!svg) throw new Error('No SVG element found');

			svg.tagName = 'symbol';
			svg.setAttribute('id', iconName(file));
			svg.removeAttribute('xmlns');
			svg.removeAttribute('xmlns:xlink');
			svg.removeAttribute('version');
			svg.removeAttribute('width');
			svg.removeAttribute('height');

			return svg.toString().trim();
		})
	);

	return [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">`,
		`<defs>`, // for semantics: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
		...symbols,
		`</defs>`,
		`</svg>`,
		'', // trailing newline
	].join('\n');
}

export async function generateSprite(config: Config) {
    const { outDir = defaultConfig.outDir, icons } = config;
    const { inputDir, outputDir } = icons;

    const cwd = process.cwd();

    const inputDirRelative = path.relative(cwd, inputDir);
    const outputDirRelative = path.join(cwd, outDir);
    const spriteOutputDirRelative = path.join(cwd, outputDir);

    await Promise.all([
        fsExtra.ensureDir(inputDirRelative),
        fsExtra.ensureDir(outputDirRelative),
        fsExtra.ensureDir(spriteOutputDirRelative),
    ]);

    const files = glob
        .sync('**/*.svg', {
            cwd: inputDirRelative,
        })
        .sort((a, b) => a.localeCompare(b));


    if (files.length === 0) {
        console.log(`No SVG files found in ${inputDirRelative}`);
    } else {
        await generateIconFiles({
            files,
            inputDir: inputDirRelative,
            outputDir: outputDirRelative,
            spriteOutputDir: spriteOutputDirRelative
        });
    }
}