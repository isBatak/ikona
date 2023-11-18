import fsExtra from 'fs-extra';

export function validatePath(
	path: string | undefined,
	errorMessage: string
): asserts path is string {
	if (!path) {
		throw new Error(errorMessage);
	}
}

export async function writeIfChanged(filepath: string, newContent: string, hash?: string) {
	let _filepath = filepath;

	if (hash) {
		_filepath = filepath.replace(/\.svg$/, `.${hash}.svg`);
	}

	const currentContent = await fsExtra.readFile(_filepath, 'utf8').catch(() => '');
	if (currentContent === newContent) return false;
	await fsExtra.writeFile(_filepath, newContent, 'utf8');
	return true;
}