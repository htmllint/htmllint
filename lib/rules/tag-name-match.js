var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'tag-name-match',
    on: ['tag']
};

module.exports.lint = function (element, opts) {
    // If the tag did not close itself
    if (!element.close ||
        element.name.toLowerCase() !== element.close.toLowerCase()) {
        if (opts['tag-close'] && !knife.isSelfClosing(element)) {
            return new Issue('E042', element.openLineCol);
        }
    } else {
        if (opts['tag-name-match'] && element.name !== element.close) {
            return new Issue('E030', element.closeLineCol);
        }
    }

    return [];
};
