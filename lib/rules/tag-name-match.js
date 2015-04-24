var Issue = require('../issue');

module.exports = {
    name: 'tag-name-match',
    on: ['tag']
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name] || (!element.close) ||
            element.name === element.close) {
        return [];
    }

    return new Issue('E030', element.closeLineCol);
};
