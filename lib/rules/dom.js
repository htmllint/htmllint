var lodash = require('lodash'),
    knife = require('../knife');

module.exports = {
    name: 'dom'
};

module.exports.lint = function(dom, opts) {
    var subs = this.subscribers;
    var getIssues = function (element) {
        var s = subs.filter(function(rule) {
            return !rule.trigger
                || rule.trigger.indexOf(element.type) > -1;
        });
        var ret = knife.applyRules(s, element, opts);

        if (element.children && element.children.length > 0) {
            element.children.forEach(function (child) {
                ret = ret.concat(getIssues(child));
            });
        }
        return ret;
    };

    var issues = dom.length ? dom.map(getIssues) : [];
    return lodash.flatten(issues);
};
