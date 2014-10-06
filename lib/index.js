var lodash = require('lodash'),
    Linter = require('./linter');

/**
 * The htmllint namespace.
 * @namespace
 */
var htmllint = function () {
    var linter = htmllint.defaultLinter;

    return linter.lint.apply(linter, arguments);
};
htmllint.defaultLinter = new Linter(htmllint.rules);

module.exports = htmllint;

htmllint.Linter = Linter;
htmllint.rules = require('./rules');

htmllint.create = function (rules) {
    var newRules = {};
    rules.forEach(function (rule) {
        if (lodash.isString(rule)) {
            // if the rule is a string, resolve the name
            newRules[rule] = htmllint.rules[rule];
        } else {
            newRules[rule.name] = rule;
        }
    });

    return new Linter(newRules);
};
