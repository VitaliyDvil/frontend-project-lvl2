#! /usr/bin/env node

import program from 'commander';
import gendiff from '../src/index.js';

program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.arguments('<filepath1> <filepath2>');
program.option('-f, --format [type]', 'output format');
program.action((filepath1, filepath2) => {
    const result = gendiff(filepath1, filepath2);
    console.log(result);
});

program.parse(process.argv);

/*
in makefile npx?npm?
*/