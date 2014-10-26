var lodash = require('lodash');

module.exports = {
    applyRules: function(rules, element, opts) {
        if (!rules) {
            return [];
        }

        return lodash.flatten(rules.map(function(rule) {
            return rule.lint.call(rule, element, opts);
        }));
    }
};
