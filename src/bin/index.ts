#!/usr/bin/env node
import { Command } from 'commander'

import { getEslint } from '../eslint'
import { buildWebpack } from '../build/webpack'

const program = new Command()

program
  .version('0.1.0')
  .description('start eslint and fix code')
  .command('eslint')
  .action((value) => {
    getEslint()
  })

program
  .version('0.1.0')
  .description('start webpack')
  .command('webpack')
  .action((value) => {
    buildWebpack()
  })

program.parse(process.argv)
