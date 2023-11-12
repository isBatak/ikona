# typescript-cli-starter

A Typescript CLI starter template.

![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/isBatak/typescript-cli-starter.svg?style=flat-square)

![GitHub](https://img.shields.io/github/license/isBatak/typescript-cli-starter.svg?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/isBatak/typescript-cli-starter.svg?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/isBatak/typescript-cli-starter.svg?style=flat-square)

![GitHub last commit](https://img.shields.io/github/last-commit/isBatak/typescript-cli-starter.svg?style=flat-square)

Includes:

- [TypeScript](https://www.typescriptlang.org/), for writing good code
- [Node Test Runner](https://nodejs.org/api/test.html), for writing good tests
- [Commander](https://www.npmjs.com/package/commander), for building CLI applications
- [Pkg](https://www.npmjs.com/package/pkg), for building cross-platform native executables
- [Prettier](https://prettier.io/), for formatting your code
- [ESLint](https://eslint.org/), for linting your code

Your application will be installable from `npm` or by sharing your native executables.

## Usage

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

Cleans, then builds, and tests the built code.

### **bundle**

`pnpm run bundle`

Cleans, then builds, then bundles into native executables for Windows, Mac, and Linux.

Your shareable executables will be in the `./exec/` directory.
