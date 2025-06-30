import { parse } from "node-html-parser";
import { IconData } from "../get-icons-data";

/**
 * Creates a single SVG file that contains all the icons
 */

export function svgSpriteTemplate(iconsData: Array<IconData>) {
  // Each SVG becomes a symbol and we wrap them all in a single SVG
  const symbols = iconsData.map((iconData) => {
    const input = iconData.content;
    const root = parse(input);

    const svg = root.querySelector("svg");
    if (!svg) throw new Error("No SVG element found");

    svg.tagName = "symbol";
    svg.setAttribute("id", iconData.name);
    svg.removeAttribute("xmlns");
    svg.removeAttribute("xmlns:xlink");
    svg.removeAttribute("version");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.removeAttribute("fill");

    return svg.toString().trim();
  });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 0 0" width="0" height="0">`,
    `<defs>`, // for semantics: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
    ...symbols,
    `</defs>`,
    `</svg>`,
    "", // trailing newline
  ].join("\n");
}
