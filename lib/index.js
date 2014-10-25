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

module.exports = htmllint;

htmllint.Linter = Linter;
htmllint.rules = require('./rules');
htmllint.defaultLinter = new Linter(htmllint.rules);

htmllint.create = function (rules) {
    var newRules = {};
    rules.concat(['dom', 'line', 'attr', 'tag']).forEach(function (rule) {
        if (lodash.isString(rule)) {
            // if the rule is a string, resolve the name
            newRules[rule] = htmllint.rules[rule];
        } else {
            newRules[rule.name] = rule;
        }
    });

    return new Linter(newRules);
};
