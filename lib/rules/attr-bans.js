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
            issues.push({
                index: element.index,
                line: element.openLineCol[0],
                column: element.openLineCol[1],
                msg: 'the \'' + attr + '\' attribute is banned'
            });
        }
    });
    return issues;
};
