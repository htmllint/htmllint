module.exports = {
    name: 'doctype-first',
    on: ['dom']
};

var done = false;
module.exports.end = function () { done = false; };

module.exports.lint = function (element, opts) {
    if ((!opts[this.name]) || done) {
        return [];
    }
    done = true;

    // Give an error if the element is a valid doctype directive
    return (element.type === 'directive' && element.name === '!DOCTYPE')
      ? []
      : {
            index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: '<!DOCTYPE> should be the first element seen'
        };
};
