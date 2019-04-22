var lodash = require('lodash'),
    Issue = require('../issue'),
    proc = require('../process_option');

module.exports = {
    name: 'attr-bans',
    on: ['tag'],
    desc: [
'The value of this option is a list of strings, each of which is an',
'attribute name or regular expression matching attribute names.',
'Attributes with any of the given names are disallowed.'
].join('\n'),
    process: proc.arrayOfAttrs
};

module.exports.lint = function (element, opts) {
    var bannedAttrs = opts[this.name];

    var attrs = element.attribs;
    var issues = [];
    function addIssue(name) {
        issues.push(new Issue('E001',
            attrs[name].nameLineCol, { attribute: name }));
    }

    bannedAttrs.forEach(function (name) {
        if (lodash.isRegExp(name)) {
            Object.keys(attrs)
                .filter(function(n) {return !name.test(n);})
                .forEach(addIssue);
        } else if (attrs.hasOwnProperty(name)) {
            addIssue(name);
        }
    });

    return issues;
};
