import path from 'node:path';
import { describe, expect, test, beforeAll, afterAll } from 'vitest';
import { fileURLToPath } from 'node:url';
import { generateSprite } from '../src/icons/build';

describe('build', () => {
  const cwd = process.cwd();
  const _dirname = path.dirname(fileURLToPath(import.meta.url));
  const iconsInputDir = path.resolve(cwd, _dirname, './samples/icons');
  const spriteOutputDir = path.resolve(cwd, _dirname, './output/icons');
  const illustrationsInputDir = path.resolve(
    cwd,
    _dirname,
    './output/illustrations'
  );

  test('should generate icons', async () => {
    const result = await generateSprite(
      {},
      {
        icons: {
          optimize: false,
          inputDir: iconsInputDir,
          spriteOutputDir: spriteOutputDir,
          hash: true,
        },
        illustrations: {
          inputDir: illustrationsInputDir,
        },
      }
    );

    expect(result).toMatchSnapshot();
  });
});
