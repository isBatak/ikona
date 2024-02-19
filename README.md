![ikona](resources/logo.svg)

An SVG sprite and illustration asset generator called /ikɔna/.

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/isBatak/ikona.svg?style=flat-square)

![GitHub](https://img.shields.io/github/license/isBatak/ikona.svg?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/isBatak/ikona.svg?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/isBatak/ikona.svg?style=flat-square)

![GitHub last commit](https://img.shields.io/github/last-commit/isBatak/ikona.svg?style=flat-square)

## Motivation

Inlining SVGs in the DOM comes with a price of performance. This is why we use SVG sprites. But creating and maintaining SVG sprites is a pain. This is where Ikona comes in to help.
Ikona distinguishes two types of SVGs: icons and illustrations. Icons are small and simple SVGs that use only one color. Illustrations are SVGs that are more complex and use multiple colors.

> This project is inspired by this article [The "best" way to manage icons in React.js](https://benadam.me/thoughts/react-svg-sprites/).

## Installation

`npm i save-dev @ikona/cli`

## Usage

### Configuration

Create a file named `ikona.config.ts` in the root of your project. This file will contain the configuration for Ikona.

```js
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
```

### Generating SVG sprites

To generate SVG sprites, run the following command:

`ikona`

### Using icons

To use icons, import the generated code to create a React component.

```tsx
import React from 'react';

import { IconName } from '.ikona/types/icon-name';
import { hash } from '.ikona/hash';

export const Icon = ({ name }: { name: IconName }) => {
  return (
    <svg>
      <use href={`/icons/sprite.${hash}.svg#${name}`} />
    </svg>
  );
};
```

### Preloading SVG sprites

To preload SVG sprites, include this snippet in your HTML `head`.

```jsx
import { hash } from '.ikona/hash';

<link
  rel="preload"
  as="image"
  type="image/svg+xml"
  href={`icons/sprite.${hash}.svg`}
/>;
```

### Using illustrations

> Illustration is conceptually similar to icons but the difference is that illustrations are more complex and use multiple colors. Illustrations could be `.png`, `.jpg`, or `.svg` files and they live in a public directory, thats why they use `<img>` tag under the hood.

To use illustrations, import the generated code to create a React component.

```tsx
import React from 'react';

import { IllustrationPath } from '.ikona/types/illustration-path';

export const Illustration = ({ path }: { path: IllustrationPath }) => {
  return <img src={path} />;
};
```

## CLI

todo

## Contributing

### **dev**

`pnpm run dev`

Runs the CLI application.

You can pass arguments to your application by running `pnpm run dev -- --your-argument`. The extra `--` is so that your arguments are passed to your CLI application, and not `pnpm`.

### **clean**

`pnpm run clean`

Removes any built code and any built executables.

### **build**

`pnpm run build`

Cleans, then builds the TypeScript code.

Your built code will be in the `./dist/` directory.

### **test**

`pnpm run test`

Cleans, then build and test the built code.

### **bundle**

`pnpm run bundle`

Cleans, then builds, then bundles into native executables for Windows, Mac, and Linux.

Your shareable executables will be in the `./exec/` directory.
