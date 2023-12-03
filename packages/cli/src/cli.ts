#!/usr/bin/env node

import { Command } from 'commander';
import { name, version, description } from '../../../package.json';

import { init } from './index';
import type { CliConfig } from './types';

const program = new Command();

program
  .name(name)
  .version(version)
  .description(description)
  .option('-v, --verbose', 'Verbose output')
  .option('--out-dir <path>', 'Output directory')
  .option('--optimize', 'Optimize SVGs')
  .option('--force', 'Force generation of files')
  .option('--hash', 'Hash sprite file name')
  .parse(process.argv);

const options = program.opts<CliConfig>();

init(options);
