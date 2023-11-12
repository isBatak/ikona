import fsExtra from 'fs-extra';

export function validatePath(
	path: string | undefined,
	errorMessage: string
): asserts path is string {
	if (!path) {
		throw new Error(errorMessage);
	}
}

export async function writeIfChanged(filepath: string, newContent: string) {
	const currentContent = await fsExtra.readFile(filepath, 'utf8').catch(() => '');
	if (currentContent === newContent) return false;
	await fsExtra.writeFile(filepath, newContent, 'utf8');
	return true;
}
