module.exports = {
    name: 'tag-name-lowercase',
    description: 'If set, tag names must be lowercase.'
};

module.exports.process = function (element, opts) {
    if (!opts[this.name] || element.type !== 'tag') {
        return null;
    }

    if ((/[A-Z]/).test(element.name)) {
        return {
            index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: 'tag names must be lowercase'
        };
    }
    return [];
};
