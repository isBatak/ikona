import { optimize as svgOptimize, type Config } from "svgo";

export const defaultSVGOConfig: Config = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeHiddenElems: false,
          removeUselessDefs: false,
          cleanupIds: false,
        },
      },
    },
  ],
};

export function optimize(output: string, options: Config = defaultSVGOConfig) {
  return svgOptimize(output, options).data;
}
