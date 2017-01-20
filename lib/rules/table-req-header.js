var Issue = require('../issue');

module.exports = {
    name: 'table-req-header',
    on: ['tag'],
    filter: ['table'],
    desc: 'If set, each `table` tag must contain a `header` tag.' // TODO
};

module.exports.lint = function (ele, opts) {
    var children = ele.children;
    var childIndex = 0;
    var child = children[childIndex];

    //ffwd to first relevant table child
    while (child && child.name &&
           child.name.match(/(caption|colgroup|tfoot)/i)) {
        childIndex++;
        child = children[childIndex];
    }

    if (child && child.name &&
        ((child.name.match(/thead/i)) ||
         (child.name.match(/tr/i) && child.children[0].name.match(/th/i)))
       ) {
        return [];
    }

    return new Issue('E035', ele.openLineCol);
};
