#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var eslint_1 = require("../eslint");
var webpack_1 = require("../build/webpack");
var program = new commander_1.Command();
program
    .version('0.1.0')
    .description('start eslint and fix code')
    .command('eslint')
    .action(function (value) {
    (0, eslint_1.getEslint)();
});
program
    .version('0.1.0')
    .description('start webpack')
    .command('webpack')
    .action(function (value) {
    (0, webpack_1.buildWebpack)();
});
program.parse(process.argv);
