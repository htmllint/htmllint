module.exports = {
    name: 'tag-name-lowercase',
    description: 'If set, tag names must be lowercase.',
    on: ['tag']
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name]) {
        return [];
    }

    return (/[A-Z]/).test(element.name)
      ? {
            index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: 'tag names must be lowercase'
        }
      : [];
};
