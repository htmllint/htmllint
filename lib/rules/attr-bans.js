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
            var a = element.attribs[attr];
            issues.push({
                index: a.nameIndex,
                line: a.nameLineCol[0],
                column: a.nameLineCol[1],
                msg: 'the \'' + attr + '\' attribute is banned'
            });
        }
    });
    return issues;
};
