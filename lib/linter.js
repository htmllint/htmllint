var lodash = require('lodash'),
    Parser = require('./parser'),
    envs = require('require-all')(__dirname + '/envs');


/**
 * A linter is configured with a set of rules that are fed the raw
 * html and ast nodes.
 * @constructor
 */
var Linter = function (rules) {
    this.rules = rules || {};
    this.parser = new Parser();
};
module.exports = Linter;

Linter.prototype.addRule = function (rule) {
    this.rules[rule.name] = rule;
};

Linter.prototype.lint = function (html, opts) {

    var presets = (opts && opts[preset]) ? opts[preset] : ['default'],
    env
    for (var i = 0; i < presets.length; i++)  {
        var preset = presets[i];
        //console.log(preset);
        if (envs && envs[preset] && envs[preset][preset]) {
            env = lodash.merge(envs[preset][preset], env);
        }
    }
    env = lodash.merge(envs['none']['none'], env);
    opts = lodash.merge(env, opts);

    console.log(presets);
    console.log(env);

    var dom = null,
        scanIssues = null,
        domIssues = null,
        maxerr = (opts ? opts.maxerr : null) || 30;

    // scan raw html string
    scanIssues = this.execRules('scan', [html, opts]);

    // process dom
    dom = this.parser.parse(html);
    domIssues = this.execRules('process', [dom, opts]);

    return lodash.first(scanIssues.concat(domIssues)
        .map(function (issue) {
            // TODO: implement more efficiently
            var pos = Linter.getPos(html, issue.index);

            issue.line = pos.line;
            issue.column = pos.column;

            return issue;
        }), maxerr);
};

Linter.prototype.execRules = function (funcName, args) {
    var ruleNames = Object.keys(this.rules);

    return lodash(ruleNames)
        .map(function (ruleName) {
            var rule = this.rules[ruleName];

            if (!rule[funcName]) {
                return null;
            }

            return rule[funcName].apply(rule, args);
        }.bind(this))
        .flatten()
        .compact()
        .value();
};

Linter.getPos = function (str, index) {
    // TODO: reimplement, probs buggy
    // TODO: write tests
    // TODO: move out of this into some utility module perhaps?
    var re = /\n/g,
        row = 1, // line numbers start at 1 in most text editors
        cursor = re.exec(str),
        lastCursor = -1;

    while (cursor && cursor.index < index) {
        // advance to the next line
        lastCursor = cursor.index;
        cursor = re.exec(str);
        row += 1;
    }

    return {
        line: row,
        column: index - lastCursor
    };
};
