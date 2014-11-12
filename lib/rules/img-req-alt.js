var Issue = require('../issue');

module.exports = {
    name: 'img-req-alt',
    filter: ['img'],
    on: ['tag']
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var a = element.attribs;

    if (a && a.hasOwnProperty('alt') && a.alt !== '') {
        return [];
    }

    return new Issue('E013', element.openLineCol);
};
