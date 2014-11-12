var Issue = require('../issue');

module.exports = {
    name: 'doctype-first',
    on: ['dom']
};

var done = false;
module.exports.end = function () {
    done = false;
};

module.exports.lint = function (element, opts) {
    if ((!opts[this.name]) || done) {
        return [];
    }
    done = true;

    var lineCol = element.openLineCol || element.lineCol;

    if (element.type === 'directive' && element.name === '!DOCTYPE') {
        return [];
    }

    return new Issue('E007', lineCol);
};
