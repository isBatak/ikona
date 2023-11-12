#!/usr/bin/env node

import { Command } from 'commander'

import { orderPizza } from './index'

const program = new Command()

program
  .name('pizza')
  .description('Order a pizza')
  .version('0.1.0')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option(
    '-c, --cheese [type]',
    'Add the specified type of cheese [marble]',
    'marble'
  )
  .parse(process.argv)

interface Options {
  peppers: boolean
  pineapple: boolean
  bbqSauce: boolean
  cheese: string
}

const options = program.opts<Options>()

orderPizza({
  peppers: options.peppers,
  pineapple: options.pineapple,
  bbqSauce: options.bbqSauce,
  cheeseType: options.cheese,
}).then((result) => console.log(result.message))
