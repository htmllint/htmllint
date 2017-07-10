var Issue = require('../issue');

module.exports = {
    name: 'table-req-header',
    on: ['tag'],
    filter: ['table'],
    desc: [
'If set, each `table` tag must contain a header: a `thead` tag',
'or a `tr` tag with a `th` child.'
].join('\n')
};

module.exports.lint = function (ele, opts) {
    var children = ele.children,
        childIndex = 0,
        child;

    //ffwd to first relevant table child
    while ((child = children[childIndex]) && 
        (
            child.name === undefined || // skip text nodes
            (child.name && child.name.match(/(caption|colgroup)/i))
        )
    ) {
        childIndex++;
    }

    if (child && child.name &&
        ((child.name.match(/thead/i)) ||
         (child.name.match(/tr/i) && child.children[0].name.match(/th/i)))
       ) {
        return [];
    }

    return new Issue('E035', ele.openLineCol);
};
