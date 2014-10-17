module.exports = {
    name: 'doctype-first',
    description: [
        'If set, checks that !DOCTYPE appears as the first ',
        'element in the DOM. It does not check that !DOCTYPE appears ',
        'anywhere else. '
    ].join('')
};

module.exports.process = function (element, opts) {
    // if this rule is not enabled, get outta here!
    if (!opts[this.name]) {
        return [];
    }

    // if the element has a parent or a previous, don't process it
    if (element.parent !== null || element.prev !== null) {
        return [];
    }

    // if the element is a valid doctype directive
    if (element.type === 'directive' && element.name === '!DOCTYPE') {
        return [];
    }

    // element is not !DOCTYPE
    return {
        index: element.index,
        line: element.openLineCol[0],
        column: element.openLineCol[1],
        msg: '<!DOCTYPE> should be the first element seen'
    };
};
