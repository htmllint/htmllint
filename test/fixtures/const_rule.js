var ConstRule = function (issues) {
    this.issues = issues;
    this.name = 'const-rule';
    this.description = 'returns a constant issue array for all inputs';
};

module.exports = ConstRule;

ConstRule.prototype.process = function () {
    return this.issues;
};
