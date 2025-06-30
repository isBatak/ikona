# @ikona/cli

## 0.2.0

### Minor Changes

- a2351e7: - optimize each svg separately
  - expose svgo config in the ikona.config.js file
- 8347fb7: replace fill and stroke values with currentColor when optimizing

## 0.1.10

### Patch Changes

- fix last version build artifacts

## 0.1.9

### Patch Changes

- e2caee1: fix storybook issue with `image-size` lib

## 0.1.8

### Patch Changes

- 9cebb11: Add tests
- 09f5365: Add config for illustration file extension (webp)

  ```js
  {
    illustrations: {
      extensions: ['svg', 'png', 'jpg', 'jpeg', 'webp'],
    },
  }
  ```

- b44af77: Fix optimize option

## 0.1.7

### Patch Changes

- eac415c: Fix Typescript error when declaration setting is enabled. To fix these tha package exports type definitions for CliConfig and Config.

## 0.1.6

### Patch Changes

- 3f96a51: - Add --hash option
