import { describe, expect, it } from 'vitest';
import { generateSvgSprite } from './generate-svg-sprite';
import mock from 'mock-fs';

describe('generate-svg-sprite', () => {
  it('should generate sprite', async () => {
    const fileName = 'heart.svg';
    const iconsDir = 'packages/cli/__tests__/samples/icons';

    mock({
      [iconsDir]: {
        [fileName]: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
      },
    });

    const result = await generateSvgSprite({
      files: [fileName],
      inputDir: iconsDir,
    });

    expect(result).toMatchInlineSnapshot();
  });
});
