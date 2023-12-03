import { defineConfig } from '@ikona/cli';

export default defineConfig({
  verbose: false,
  icons: {
    optimize: false,
    inputDir: 'src/assets/icons',
    spriteOutputDir: 'public/icons',
    hash: true,
  },
  illustrations: {
    inputDir: 'public/illustrations',
  },
});
