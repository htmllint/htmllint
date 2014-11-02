module.exports = {
    name: 'tag-bans',
    on: ['dom'],
    filter: ['tag', 'style']
};

module.exports.lint = function (element, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }

    return (format.indexOf(element.name) > -1) ? {
        name: this.name,
        index: element.index,
        line: element.openLineCol[0],
        column: element.openLineCol[1],
        msg: 'element [' + element.name + '] not allowed'
    } : [];
};