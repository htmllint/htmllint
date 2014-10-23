module.exports = {
    name: 'attr-bans',
    description: [
        'For each attribute assigned, any instance of the ',
        'attribute will raise an error.'
    ].join('')
};

module.exports.process = function (element, opts) {
    var bannedAttrs = opts[this.name];

    if (!bannedAttrs || element.type !== 'tag' || !element.attribs) {
        return null;
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
