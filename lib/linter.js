var Linter = module.exports = function () {
    this.rules = {};
};

Linter.prototype.addRule = function (rule) {
    this.rules[rule.name] = rule;
};

Linter.prototype.lint = function (html, opts) {
    var ruleNames = Object.keys(this.rules);

    return ruleNames.map(function (ruleName) {
        var rule = this.rules[ruleName];
        return rule.process(html);
    }.bind(this)).reduce(function (issues, item) {
        return issues.concat(item);
    }, []);
};
