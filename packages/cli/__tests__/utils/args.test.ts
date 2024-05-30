import { getCommandLineArg } from "../../src/utils/args";

describe("getCommandLineArg", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = [...originalArgv];
  });

  afterAll(() => {
    process.argv = originalArgv;
  });

  it("should return the argument value if the argument is found", () => {
    process.argv.push("--testArg", "testValue");

    const result = getCommandLineArg("testArg");

    expect(result).toBe("testValue");
  });

  it("should return undefined if the argument is not found", () => {
    const result = getCommandLineArg("nonExistentArg");

    expect(result).toBeUndefined();
  });

  it("should return undefined if the argument is found but has no value", () => {
    process.argv.push("--testArg");

    const result = getCommandLineArg("testArg");

    expect(result).toBeUndefined();
  });

  it("should handle multiple arguments correctly", () => {
    process.argv.push("--firstArg", "firstValue", "--secondArg", "secondValue");

    const firstResult = getCommandLineArg("firstArg");
    const secondResult = getCommandLineArg("secondArg");

    expect(firstResult).toBe("firstValue");
    expect(secondResult).toBe("secondValue");
  });

  it("should handle arguments with hyphens in their names", () => {
    process.argv.push("--my-arg-name", "argValue");

    const result = getCommandLineArg("my-arg-name");

    expect(result).toBe("argValue");
  });

  it("should return the correct value if similar argument names exist", () => {
    process.argv.push("--testArg", "testValue", "--testArgExtra", "extraValue");

    const result = getCommandLineArg("testArg");

    expect(result).toBe("testValue");
  });
});
