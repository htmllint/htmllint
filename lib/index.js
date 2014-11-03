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
