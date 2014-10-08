module.exports = {
    name: 'attr-no-duplication',
    description: 'Checks that an element does not define an attribute more than once.'
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

    console.log(element);
    
    // make sure this first element is !DOCTYPE
    if (element.type !== 'directive' || element.name !== "!DOCTYPE") {
        // element is not !DOCTYPE
        return {
            index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: '<!DOCTYPE> should be the first element seen'
        };
    }
};