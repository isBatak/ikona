import path from "node:path";
import fs from "node:fs";
import os from "node:os";

const tempDir = os.tmpdir();

let savedDir: string | null = null;
let currentDir: string | null = null;

interface Dir {
  [key: string]: File;
}
type File = Dir | string;

function mkdirpSync(nested: string): void {
  const paths = [];
  let curr = nested;
  for (;;) {
    paths.push(curr);
    const { root, dir } = path.parse(curr);
    if (root === dir) {
      break;
    }
    curr = dir;
  }
  for (let i = paths.length - 1; i >= 0; i -= 1) {
    try {
      fs.mkdirSync(paths[i]);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
        throw error;
      }
    }
  }
}

function visit(curr: string, dir: Dir) {
  Object.entries(dir).forEach(([name, contents]) => {
    const filepath = path.join(curr, name);

    if (typeof contents === "string") {
      mkdirpSync(path.dirname(filepath));
      fs.writeFileSync(filepath, contents, "utf-8");
    } else {
      fs.mkdirSync(filepath);
      visit(filepath, contents);
    }
  });
}

export function mockFs(root: Dir): void {
  if (savedDir !== null) {
    throw new Error(`A file system is already being mocked.`);
  }

  currentDir = process.cwd();
  savedDir = fs.mkdtempSync(path.join(tempDir, "mock-fs-"));
  visit(savedDir, root);
  process.chdir(savedDir);
}

mockFs.restore = () => {
  if (savedDir === null) {
    throw new Error(`There is no file system to restore.`);
  }

  if (currentDir === null) {
    throw new Error(`There is no current directory to restore.`);
  }

  fs.rmSync(savedDir, { recursive: true });
  process.chdir(currentDir);

  savedDir = null;
  currentDir = null;
};
