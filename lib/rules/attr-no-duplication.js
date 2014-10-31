module.exports = {
    name: 'attr-no-duplication',
    on: ['tag']
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name] || !element.dupes) {
        return [];
    }

    return element.dupes.map(function(n) {
        var a = element.attribs[n];
        return {
            index: a.nameIndex,
            line: a.nameLineCol[0],
            column: a.nameLineCol[1],
            msg: 'duplicate attribute: ' + n
        };
    });
};
