import fsExtra from "fs-extra";
import { join } from "node:path";
import { addHashToSpritePath } from "../../src/utils/hash";
import {
  validatePath,
  clear,
  writeIfChanged,
} from "../../src/utils/validations";

jest.mock("fs-extra");
jest.mock("../../src/utils/hash");

describe("validatePath", () => {
  it("should throw an error if path is undefined", () => {
    expect(() => validatePath(undefined, "Path is required")).toThrow(
      "Path is required"
    );
  });

  it("should throw an error if path is empty string", () => {
    expect(() => validatePath("", "Path is required")).toThrow(
      "Path is required"
    );
  });

  it("should not throw an error if path is valid", () => {
    expect(() => validatePath("valid/path", "Path is required")).not.toThrow();
  });
});

describe("clear", () => {
  beforeEach(() => {
    (fsExtra.readdir as unknown as jest.Mock).mockClear();
    (fsExtra.unlink as unknown as jest.Mock).mockClear();
  });

  it("should read the directory and filter svg files starting with sprite", () => {
    const mockFiles = ["sprite1.svg", "sprite2.svg", "other.svg"];
    (fsExtra.readdir as unknown as jest.Mock).mockImplementation(
      (path, callback) => {
        callback(null, mockFiles);
      }
    );

    clear("/mock/folder");

    expect(fsExtra.readdir).toHaveBeenCalledWith(
      "/mock/folder",
      expect.any(Function)
    );
    expect(fsExtra.unlink).toHaveBeenCalledTimes(2);
    expect(fsExtra.unlink).toHaveBeenCalledWith(
      join("/mock/folder", "sprite1.svg"),
      expect.any(Function)
    );
    expect(fsExtra.unlink).toHaveBeenCalledWith(
      join("/mock/folder", "sprite2.svg"),
      expect.any(Function)
    );
  });

  it("should handle error while reading directory", () => {
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();
    (fsExtra.readdir as unknown as jest.Mock).mockImplementation(
      (path, callback) => {
        callback(new Error("Read error"), null);
      }
    );

    clear("/mock/folder");

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Error reading folder:",
      expect.any(Error)
    );
    consoleErrorMock.mockRestore();
  });
});

describe("writeIfChanged", () => {
  beforeEach(() => {
    (fsExtra.readFile as unknown as jest.Mock).mockClear();
    (fsExtra.writeFile as unknown as jest.Mock).mockClear();
    (fsExtra.readFile as unknown as jest.Mock).mockResolvedValue("");
  });

  it("should write new content if the file does not exist", async () => {
    const options = {
      filepath: "/mock/filepath.svg",
      newContent: "new content",
    };
    (fsExtra.readFile as unknown as jest.Mock).mockRejectedValue(
      new Error("File not found")
    );

    const result = await writeIfChanged(options);

    expect(result).toBe(true);
    expect(fsExtra.writeFile).toHaveBeenCalledWith(
      "/mock/filepath.svg",
      "new content",
      "utf8"
    );
  });

  it("should not write content if it is the same and force is not true", async () => {
    const options = {
      filepath: "/mock/filepath.svg",
      newContent: "existing content",
    };
    (fsExtra.readFile as unknown as jest.Mock).mockResolvedValue(
      "existing content"
    );

    const result = await writeIfChanged(options);

    expect(result).toBe(false);
    expect(fsExtra.writeFile).not.toHaveBeenCalled();
  });

  it("should write content if it is the same but force is true", async () => {
    const options = {
      filepath: "/mock/filepath.svg",
      newContent: "existing content",
      force: true,
    };
    (fsExtra.readFile as unknown as jest.Mock).mockResolvedValue(
      "existing content"
    );

    const result = await writeIfChanged(options);

    expect(result).toBe(true);
    expect(fsExtra.writeFile).toHaveBeenCalledWith(
      "/mock/filepath.svg",
      "existing content",
      "utf8"
    );
  });

  it("should clear the folder and write content if hash is provided", async () => {
    const options = {
      filepath: "/mock/filepath/sprite.svg",
      newContent: "new content",
      hash: "123",
    };
    (addHashToSpritePath as unknown as jest.Mock).mockReturnValue(
      "/mock/filepath/sprite-123.svg"
    );

    const result = await writeIfChanged(options);

    expect(result).toBe(true);
    expect(addHashToSpritePath).toHaveBeenCalledWith(
      "/mock/filepath/sprite.svg",
      "123"
    );
    expect(fsExtra.writeFile).toHaveBeenCalledWith(
      "/mock/filepath/sprite-123.svg",
      "new content",
      "utf8"
    );
  });
});
