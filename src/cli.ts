#!/usr/bin/env node

import { Command } from 'commander'
import { name, version, description } from '../package.json'

import { init } from './index'

const program = new Command()

program
  .name(name)
  .version(version)
  .description(description)
  .option('-v, --verbose', 'Verbose output')
  .parse(process.argv)

export interface Options {
  verbose: boolean
}

const options = program.opts<Options>()

init(options)
