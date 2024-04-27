import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/** @type {JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  prettierPath: require.resolve('prettier-2'),
};
