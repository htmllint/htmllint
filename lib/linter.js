var lodash = require('lodash'),
    requireAll = require('require-all'),
    Parser = require('./parser');

var Linter = module.exports = function () {
    this.rules = {};
    this.parser = new Parser();

    // add all default rules to the linter
    var rules = requireAll({
        dirname: __dirname + '/rules',
        filter: /(.+)\.js/
    });

    Object.keys(rules)
        .map(function (modName) {
            return rules[modName];
        })
        .forEach(this.addRule.bind(this));
};

Linter.prototype.addRule = function (rule) {
    this.rules[rule.name] = rule;
};

Linter.prototype.lint = function (html, opts) {
    var dom = null,
        scanIssues = null,
        domIssues = null;

    // scan raw html string
    scanIssues = this.execRules('scan', [html, opts]);

    // process dom
    dom = this.parser.parse(html);
    domIssues = this.execRules('process', [dom, opts]);

    return scanIssues.concat(domIssues)
        .map(function (issue) {
            // TODO: implement more efficiently
            var pos = Linter.getPos(html, issue.index);

            issue.line = pos.line;
            issue.column = pos.column;

            return issue;
        });
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
