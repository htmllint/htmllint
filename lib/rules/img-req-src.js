module.exports = {
    name: 'img-req-src',
    on: ['tag'],
    filter: ['img']
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var a = element.attribs;
    return (a.src && a.src.value && a.src.value.length > 0) ? [] : {
        name: this.name,
        index: element.index,
        line: element.openLineCol[0],
        column: element.openLineCol[1],
        msg: 'a source must be given for each `img` tag'
    };
};