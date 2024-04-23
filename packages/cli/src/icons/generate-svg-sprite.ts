import fsExtra from 'fs-extra';
import { parse } from 'node-html-parser';
import path from 'path';
import { iconName } from './icon-name';

/**
 * Creates a single SVG file that contains all the icons
 */

export async function generateSvgSprite({
  files,
  inputDir,
}: {
  files: Array<string>;
  inputDir: string;
}) {
  // Each SVG becomes a symbol and we wrap them all in a single SVG
  const symbols = await Promise.all(
    files.map(async (file) => {
      const svgPath = path.join(inputDir, file);
      const input = await fsExtra.readFile(svgPath, 'utf8');
      const root = parse(input);

      const svg = root.querySelector('svg');
      if (!svg) throw new Error('No SVG element found');

      svg.tagName = 'symbol';
      svg.setAttribute('id', iconName(file));
      svg.removeAttribute('xmlns');
      svg.removeAttribute('xmlns:xlink');
      svg.removeAttribute('version');
      svg.removeAttribute('width');
      svg.removeAttribute('height');

      return svg.toString().trim();
    })
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">`,
    `<defs>`, // for semantics: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
    ...symbols,
    `</defs>`,
    `</svg>`,
    '', // trailing newline
  ].join('\n');
}
