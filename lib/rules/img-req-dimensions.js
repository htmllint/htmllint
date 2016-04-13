var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'img-req-dimensions',
    on: ['tag'],
    filter: ['img']
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name] || (knife.hasNonEmptyAttr(element, 'height') && knife.hasNonEmptyAttr(element, 'width'))) {
        return [];
    }

    return new Issue('E041', element.openLineCol);
};
