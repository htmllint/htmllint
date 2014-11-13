var Issue = require('../issue');

module.exports = {
    name: 'html-req-lang',
    on: ['tag'],
    filter: ['html']
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name] || element.hasOwnProperty('lang')) {
        return [];
    }

    return new Issue('E025', element.openLineCol);
};
