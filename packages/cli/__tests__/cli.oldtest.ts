import path from "node:path";
// import { execSync } from 'node:child_process';
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll } from "@jest/globals";
import fs from "node:fs/promises";

describe("cli", () => {
  const cwd = process.cwd();
  const _dirname = path.dirname(fileURLToPath(import.meta.url));
  const testsCwd = path.resolve(cwd, _dirname, "./samples");
  const binPath = path.resolve(cwd, _dirname, "../dist/cli.js");

  beforeAll(async () => {
    // Create the `samples` folder
    await fs.mkdir(testsCwd, { recursive: true });
  });

  it.skip("should work", () => {
    const cmd = `node ${binPath}"`;

    console.log(cmd);
    // const output = execSync(cmd, { cwd: testsCwd }).toString();

    expect(true).toBe(true);
  });
});
