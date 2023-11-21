import fsExtra from 'fs-extra';
import { join, extname } from 'node:path';

export function validatePath(
	path: string | undefined,
	errorMessage: string
): asserts path is string {
	if (!path) {
		throw new Error(errorMessage);
	}
}

export function clear(folderPath: string) {
	fsExtra.readdir(folderPath, (err, files) => {
		if (err) {
			console.error('Error reading folder:', err);
			return;
		}

		const svgFiles = files.filter(
			(file) => extname(file).toLowerCase() === '.svg' && file.startsWith('sprite')
		);

		svgFiles.forEach((svgFile) => {
			const filePath = join(folderPath, svgFile);

			fsExtra.unlink(filePath, (err) => {
				if (err) {
					console.error(`Error removing file ${filePath}:`, err);
				} else {
					console.log(`Removed file: ${filePath}`);
				}
			});
		});
	});
}

export async function writeIfChanged(filepath: string, newContent: string, hash?: string) {
	let _filepath = filepath;

	if (hash) {
		_filepath = filepath.replace(/\.svg$/, `.${hash}.svg`);
	}

	const currentContent = await fsExtra.readFile(_filepath, 'utf8').catch(() => '');
	if (currentContent === newContent) return false;

	if (hash) {
		const folder = filepath.replace(/sprite\.svg$/, ``);
		clear(folder);
	}

	await fsExtra.writeFile(_filepath, newContent, 'utf8');
	return true;
}
