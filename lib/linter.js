var lodash = require('lodash'),
    Parser = require('./parser');

var Linter = module.exports = function () {
    this.rules = {};
    this.parser = new Parser();
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

    return scanIssues.concat(domIssues);
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
