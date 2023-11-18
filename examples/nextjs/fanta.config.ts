import { defineConfig } from '@fanta/cli';

export default defineConfig({
  verbose: false,
  icons: {
    inputDir: 'src/assets/icons',
    outputDir: 'public/icons',
    componentsOutputDir: 'src/components/media-and-icons/icon',
    storyFile: 'src/components/media-and-icons/icon/Icon.stories.tsx',
  },
  illustrations: {
    inputDir: 'public/illustrations',
    typeDir: 'types',
    storyFile: 'src/components/media-and-icons/illustration/Illustration.stories.tsx',
  },
});
