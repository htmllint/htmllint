var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'img-req-alt',
    on: ['tag'],
    filter: ['img']
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name] || knife.hasNonEmptyAttr(element, 'alt')) {
        return [];
    }

    return new Issue('E013', element.openLineCol);
};
