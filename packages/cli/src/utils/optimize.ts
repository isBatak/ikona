import { optimize as svgOptimize, type Config } from "svgo";

export const defaultSVGOConfig: Config = {
  multipass: true,
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
  js2svg: {
    indent: 2,
    pretty: true,
  },
};

export function optimize(output: string, options: Config = defaultSVGOConfig) {
  return svgOptimize(output, options).data;
}
