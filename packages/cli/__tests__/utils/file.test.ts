import { calculateFileSizeInKB } from "../../src/utils/file";

describe("calculateFileSizeInKB", () => {
  it("should return 0 for an empty string", () => {
    const result = calculateFileSizeInKB("");
    expect(result).toBe(0);
  });

  it("should correctly calculate the file size for a short string", () => {
    const str = "Hello, World!";
    const buffer = Buffer.from(str, "utf-8");
    const expectedSize = buffer.length / 1024;

    const result = calculateFileSizeInKB(str);
    expect(result).toBeCloseTo(expectedSize);
  });

  it("should correctly calculate the file size for a longer string", () => {
    const str = "a".repeat(1024); // 1KB string
    const buffer = Buffer.from(str, "utf-8");
    const expectedSize = buffer.length / 1024;

    const result = calculateFileSizeInKB(str);
    expect(result).toBeCloseTo(expectedSize);
  });

  it("should correctly calculate the file size for a multibyte character string", () => {
    const str = "こんにちは"; // Japanese characters
    const buffer = Buffer.from(str, "utf-8");
    const expectedSize = buffer.length / 1024;

    const result = calculateFileSizeInKB(str);
    expect(result).toBeCloseTo(expectedSize);
  });

  it("should correctly calculate the file size for a string with mixed characters", () => {
    const str = "Hello, こんにちは, 123!";
    const buffer = Buffer.from(str, "utf-8");
    const expectedSize = buffer.length / 1024;

    const result = calculateFileSizeInKB(str);
    expect(result).toBeCloseTo(expectedSize);
  });
});
