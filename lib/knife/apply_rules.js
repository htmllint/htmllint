var lodash = require('lodash');

module.exports = {
    applyRules: function(rules, element, opts) {
        if (!rules) {
            return [];
        }

        return lodash.flatten(rules.map(function(rule) {
            var issues = rule.lint.call(rule, element, opts);

            // apparently we can also get an issue directly, instead of an array of issues
            if (!Array.isArray(issues)) {
                issues.rule = rule.name;
            }
            else {
                issues.forEach(function (issue) {
                    issue.rule = rule.name;
                });
            }

            return issues;
        }));

    }
};
