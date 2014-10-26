var lodash = require('lodash'),
    knife = require('../knife');

module.exports = {
    name: 'line',
    description: 'A meta rule that emits line events'
};

module.exports.lint = function(lines, opts) {
    lines[0] = '';
    var subs = this.subscribers;
    return lodash.flatten(lines.map(function (line, index) {
        if (index === 0) { return []; }
        return knife.applyRules(subs, line, opts);
    }));
};
