import { addHashToSpritePath } from "../../src/utils/hash";

describe("hash", () => {
  it("should add hash to sprite path", () => {
    const result = addHashToSpritePath("sprite.svg", "[hash]");
    expect(result).toBe("sprite.[hash].svg");
  });
});
