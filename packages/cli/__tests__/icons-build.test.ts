import { describe, expect, it } from 'vitest';
import { generateSprite } from '../src/icons/generate-sprite';

describe('build', () => {
  it('should generate icons', async () => {
    const result = await generateSprite(
      {},
      {
        outputDir: 'packages/cli/__tests__/.ikona',
        icons: {
          optimize: false,
          inputDir: 'packages/cli/__tests__/samples/icons',
          spriteOutputDir: 'packages/cli/__tests__/output/icons',
          hash: true,
        },
        illustrations: {
          inputDir: 'packages/cli/__tests__/samples/illustrations',
        },
      }
    );

    expect(result).toMatchSnapshot();
  });
});
