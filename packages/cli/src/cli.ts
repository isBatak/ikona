#!/usr/bin/env node

import { Command } from 'commander';
import { name, version, description } from '../../../package.json';

import { init } from './index';

const program = new Command();

program
  .name(name)
  .version(version)
  .description(description)
  .option('-v, --verbose', 'Verbose output')
  .option('--out-dir <path>', 'Output directory')
  .option('--optimize', 'Optimize SVGs')
  .option('--force', 'Force generation of files')
  .parse(process.argv);

export interface Config {
  verbose?: boolean;

  /**
   * Directory where the generated files
   * Default: .ikona
   */
  outputDir?: string;

  /**
   * Force generation of files
   */
  force?: boolean;

  icons: {
    optimize?: boolean;
    inputDir: string;
    spriteOutputDir: string;
  };

  illustrations: {
    inputDir: string;
  };
}

const options = program.opts<Config>();

init(options);
