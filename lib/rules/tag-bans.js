module.exports = {
    name: 'tag-bans',
    description: [
        'The value of this option is a list of strings,',
        'each of which is a tag name. Tags with any of',
        'the given names are disallowed.'
    ].join(''),
    on: ['dom'],
    trigger: ['tag', 'style']
};

module.exports.lint = function (element, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }

    return (format.indexOf(element.name) > -1)
      ? {
            index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: 'element [' + element.name + '] not allowed'
        }
      : [];
};
