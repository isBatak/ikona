import path from "node:path";
import fs from "node:fs";
import { mockFs } from "./mock-fs";

describe("mockFs", () => {
  const originalCwd = process.cwd();

  afterEach(() => {
    mockFs.restore();
  });

  it("should create a nested directory structure with files", () => {
    const structure = {
      dir1: {
        "file1.txt": "content1",
        dir2: {
          "file2.txt": "content2",
        },
      },
    };

    mockFs(structure);

    const basePath = process.cwd();
    expect(fs.existsSync(path.join(basePath, "dir1"))).toBe(true);
    expect(fs.existsSync(path.join(basePath, "dir1", "file1.txt"))).toBe(true);
    expect(
      fs.readFileSync(path.join(basePath, "dir1", "file1.txt"), "utf-8")
    ).toBe("content1");
    expect(fs.existsSync(path.join(basePath, "dir1", "dir2"))).toBe(true);
    expect(
      fs.existsSync(path.join(basePath, "dir1", "dir2", "file2.txt"))
    ).toBe(true);
    expect(
      fs.readFileSync(path.join(basePath, "dir1", "dir2", "file2.txt"), "utf-8")
    ).toBe("content2");
  });

  it("should support long path as a single property", () => {
    const structure = {
      "dir1/dir2/dir3/file.txt": "content",
    };

    mockFs(structure);

    const basePath = process.cwd();
    expect(fs.existsSync(path.join(basePath, "dir1", "dir2", "dir3"))).toBe(
      true
    );
    expect(
      fs.existsSync(path.join(basePath, "dir1", "dir2", "dir3", "file.txt"))
    ).toBe(true);

    expect(
      fs.readFileSync(
        path.join(basePath, "dir1", "dir2", "dir3", "file.txt"),
        "utf-8"
      )
    ).toBe("content");
  });

  it("should throw an error if a file system is already mocked", () => {
    const structure = {
      "file1.txt": "content1",
    };

    mockFs(structure);

    expect(() => mockFs(structure)).toThrow(
      "A file system is already being mocked."
    );
  });

  xit("should restore the original file system state", () => {
    const structure = {
      "file1.txt": "content1",
    };

    mockFs(structure);
    mockFs.restore();

    expect(process.cwd()).toBe(originalCwd);
  });

  xit("should throw an error if there is no file system to restore", () => {
    expect(() => mockFs.restore()).toThrowErrorMatchingInlineSnapshot(
      `"There is no file system to restore."`
    );
  });
});
