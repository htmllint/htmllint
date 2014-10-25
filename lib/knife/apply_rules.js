var lodash = require('lodash');

module.exports = {
    applyRules: function(rules, element, opts) {
        return lodash.flatten(rules.map(function(rule) {
            return rule.lint.call(rule, element, opts);
        }));
    }
};
