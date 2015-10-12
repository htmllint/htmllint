var Issue = require('../issue');

module.exports = {
    name: 'doctype-first',
    on: ['dom'],
    passedFirst: false
};

module.exports.end = function () {
    this.passedFirst = false;
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name] || this.passedFirst ||
        this.isComment(element) || this.isWhitespace(element)) {
        return [];
    }
    this.passedFirst = true;

    if (element.type === 'directive' &&
        element.name.toUpperCase() === '!DOCTYPE') {
        return [];
    }

    var lineCol = element.openLineCol || element.lineCol;
    return new Issue('E007', lineCol);
};

module.exports.isComment = function (element) {
    return element.type === 'comment';
};

var whitespace = (/^[ \t\n\f\r]*$/);
module.exports.isWhitespace = function (element) {
    return element.type === 'text' && whitespace.test(element.data);
};
