#!/usr/bin/env node

import { Command } from 'commander';
import { name, version, description } from '../../../package.json';

import { generate, studio } from './index';

const program = new Command();

program.name(name).version(version).description(description);

program
  .option('-v, --verbose', 'Verbose output')
  .option('--out-dir <path>', 'Output directory')
  .option('--optimize', 'Optimize SVGs')
  .option('--force', 'Force generation of files')
  .option('--hash', 'Hash sprite file name')
  .action(generate);

program
  .command('studio')
  .description('Documentation for Ikona assets')
  .option('--build', 'Build')
  .option('--preview', 'Preview')
  .option('--port <port>', 'Port')
  .option('--host', 'Host')
  .option('-c, --config <path>', 'Path to ikona config file')
  .option('--cwd <cwd>', 'Current working directory', { default: cwd })
  .option('--outdir', 'Output directory for static files')
  .action(studio);

program.parse(process.argv);
