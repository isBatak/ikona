import fsExtra from 'fs-extra';
import { join, extname } from 'node:path';
import { addHashToSpritePath } from './hash';

export function validatePath(
  path: string | undefined,
  errorMessage: string
): asserts path is string {
  if (!path) {
    throw new Error(errorMessage);
  }
}

export async function clear(folderPath: string) {
  let files: string[];
  try {
    files = await fsExtra.readdir(folderPath);
  } catch (err) {
    console.error('Error reading folder:', err);
    return;
  }

  const svgFiles = files.filter(
    (file) =>
      extname(file).toLowerCase() === '.svg' && file.startsWith('sprite')
  );

  await Promise.all(
    svgFiles.map(async (svgFile) => {
      const filePath = join(folderPath, svgFile);

      try {
        await fsExtra.unlink(filePath);
        console.log(`Removed file: ${filePath}`);
      } catch (err) {
        console.error(`Error removing file ${filePath}:`, err);
      }
    })
  );
}

interface WriteIfChangedOptions {
  filepath: string;
  newContent: string;
  hash?: string;
  force?: boolean;
}

export async function writeIfChanged({
  filepath,
  newContent,
  hash,
  force,
}: WriteIfChangedOptions) {
  let _filepath = filepath;

  if (hash) {
    _filepath = addHashToSpritePath(filepath, hash);
  }

  const currentContent = await fsExtra
    .readFile(_filepath, 'utf8')
    .catch(() => '');

  const shouldSkip = currentContent === newContent && force !== true;
  if (shouldSkip) return false;

  if (hash) {
    const folder = filepath.replace(/sprite\.svg$/, ``);
    await clear(folder);
  }

  await fsExtra.writeFile(_filepath, newContent, 'utf8');
  return true;
}
