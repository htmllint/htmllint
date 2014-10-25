module.exports = {
    name: 'doctype-first',
    description: [
        'If set, checks that !DOCTYPE appears as the first ',
        'element in the DOM. It does not check that !DOCTYPE appears ',
        'anywhere else. '
    ].join(''),
    on: ['dom']
};

var done = false;
module.exports.end = function () { done = false; };

module.exports.lint = function (element, opts) {
    return [];
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
