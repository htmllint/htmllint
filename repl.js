#!/bin/env node

var repl = require('repl');
var ctx = repl.start('>> ').context;

var htmllint = require('./');

// export stuff to use in the repl
ctx.htmllint = htmllint;

ctx.lint = function () {
    var promise = ctx.htmllint.apply(ctx.htmllint, arguments);

    promise.then(function (issues) {
        ctx['_'] = issues;

        console.log(issues);
    });
};


var parser = ctx.htmllint.defaultLinter.parser;
ctx.parse = parser.parse.bind(parser);
