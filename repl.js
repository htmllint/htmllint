#!/bin/env node

var repl = require('repl');
var ctx = repl.start('>> ').context;

// export stuff to use in the repl
ctx.lint = require('./');
var parser = ctx.lint.defaultLinter.parser;
ctx.parse = parser.parse.bind(parser);
