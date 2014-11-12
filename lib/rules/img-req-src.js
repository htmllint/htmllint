var Issue = require('../issue');

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
    if (a.src && a.src.value && a.src.value.length > 0) {
        return [];
    }

    return new Issue('E014', element.openLineCol);
};
