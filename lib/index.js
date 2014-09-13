var lodash = require('lodash'),
    requireAll = require('require-all'),
    Linter = require('./linter');

var htmllint = function (html, opts) {
    return htmllint.defaultLinter.lint(html, opts);
};

module.exports = htmllint;

htmllint.Linter = Linter;
htmllint.rules = lodash.values(requireAll({
    dirname: __dirname + '/rules',
    filter: /(.+)\.js$/
})).reduce(function (obj, rule) {
    obj[rule.name] = rule;
    return obj;
}, {});

htmllint.defaultLinter = new Linter(htmllint.rules);
