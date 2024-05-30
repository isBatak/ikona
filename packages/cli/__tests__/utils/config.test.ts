import { bundleNRequire } from "bundle-n-require";
import findUp from "escalade/sync";
import { resolve } from "path";
import {
  defaultConfig,
  findConfigFile,
  resolveFileConfig,
} from "../../src/utils/config";

jest.mock("bundle-n-require");
jest.mock("escalade/sync");
jest.mock("path", () => ({
  resolve: jest.fn(),
}));

describe("defaultConfig", () => {
  it("should have the correct default values", () => {
    expect(defaultConfig).toEqual({
      outputDir: ".ikona",
      cwd: process.cwd(),
    });
  });
});

describe("findConfigFile", () => {
  beforeEach(() => {
    (findUp as unknown as jest.Mock).mockClear();
    (resolve as unknown as jest.Mock).mockClear();
  });

  it("should resolve the file path if file is provided", () => {
    const file = "ikona.config.js";
    const cwd = "/mock/cwd";
    (resolve as unknown as jest.Mock).mockReturnValue(
      "/mock/cwd/ikona.config.js"
    );

    const result = findConfigFile({ cwd, file });

    expect(resolve).toHaveBeenCalledWith(cwd, file);
    expect(result).toBe("/mock/cwd/ikona.config.js");
  });

  it("should find the config file using findUp if file is not provided", () => {
    const cwd = "/mock/cwd";
    (findUp as unknown as jest.Mock).mockReturnValue(
      "/mock/cwd/ikona.config.js"
    );

    const result = findConfigFile({ cwd });

    expect(findUp).toHaveBeenCalledWith(cwd, expect.any(Function));
    expect(result).toBe("/mock/cwd/ikona.config.js");
  });

  it("should return undefined if no config file is found", () => {
    const cwd = "/mock/cwd";
    (findUp as unknown as jest.Mock).mockReturnValue(undefined);

    const result = findConfigFile({ cwd });

    expect(findUp).toHaveBeenCalledWith(cwd, expect.any(Function));
    expect(result).toBeUndefined();
  });
});

describe("resolveFileConfig", () => {
  beforeEach(() => {
    (findUp as unknown as jest.Mock).mockClear();
    (bundleNRequire as unknown as jest.Mock).mockClear();
  });

  it("should throw an error if config file is not found", async () => {
    (findUp as unknown as jest.Mock).mockReturnValue(undefined);

    await expect(resolveFileConfig()).rejects.toThrow("Config file not found");
  });

  it("should return the config if found and bundled successfully", async () => {
    const mockConfig = { default: { some: "config" } };
    (findUp as unknown as jest.Mock).mockReturnValue(
      "/mock/cwd/ikona.config.js"
    );
    (bundleNRequire as unknown as jest.Mock).mockResolvedValue({
      mod: mockConfig,
      dependencies: [],
    });

    const result = await resolveFileConfig();

    expect(findUp).toHaveBeenCalled();
    expect(bundleNRequire).toHaveBeenCalledWith("/mock/cwd/ikona.config.js", {
      cwd: process.cwd(),
      interopDefault: true,
    });
    expect(result).toEqual(mockConfig.default);
  });

  it("should return the config if found and bundled successfully without default export", async () => {
    const mockConfig = { some: "config" };
    (findUp as unknown as jest.Mock).mockReturnValue(
      "/mock/cwd/ikona.config.js"
    );
    (bundleNRequire as unknown as jest.Mock).mockResolvedValue({
      mod: mockConfig,
      dependencies: [],
    });

    const result = await resolveFileConfig();

    expect(findUp).toHaveBeenCalled();
    expect(bundleNRequire).toHaveBeenCalledWith("/mock/cwd/ikona.config.js", {
      cwd: process.cwd(),
      interopDefault: true,
    });
    expect(result).toEqual(mockConfig);
  });
});
