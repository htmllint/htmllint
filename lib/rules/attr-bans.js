var Issue = require('../issue');

module.exports = {
    name: 'attr-bans',
    on: ['tag']
};

module.exports.lint = function (element, opts) {
    var bannedAttrs = opts[this.name];

    if (!bannedAttrs || !element.attribs) {
        return [];
    }

    var issues = [];

    bannedAttrs.forEach(function (attr) {
        if (element.attribs.hasOwnProperty(attr)) {
            var a = element.attribs[attr],
                issue = this.createIssue(attr, a);

            issues.push(issue);
        }
    }.bind(this));

    return issues;
};

module.exports.createIssue = function (attrName, attr) {
    var pos = attr.nameLineCol,
        data = { attribute: attrName };

    return new Issue('E001', pos, data);
};
