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

    // Give an error if the element is a valid doctype directive
    return (element.type === 'directive' && element.name === '!DOCTYPE') ? [] : {
        name: this.name,
        index: element.index,
        line: lineCol[0],
        column: lineCol[1],
        msg: '<!DOCTYPE> should be the first element seen'
    };
};