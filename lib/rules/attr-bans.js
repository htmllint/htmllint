var Issue = require('../issue'),
    proc = require('../processOption');

module.exports = {
    name: 'attr-bans',
    on: ['tag'],
    desc: 'The value of this option is a list of strings, each of which is an attribute name. Attributes with any of the given names are disallowed.',
    process: proc.arrayOfStr
};

module.exports.lint = function (element, opts) {
    var bannedAttrs = opts[this.name];

    var issues = [];

    var attrs = element.attribs;
    bannedAttrs.forEach(function (name) {
        if (attrs.hasOwnProperty(name)) {
            issues.push(new Issue('E001',
                attrs[name].nameLineCol, { attribute: name }));
        }
    });

    return issues;
};
