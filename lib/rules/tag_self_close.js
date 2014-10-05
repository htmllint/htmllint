var knife = require('../knife');

module.exports = {
    name: 'tag-self-close',
    description: 'Specifies tag closing style.'
};

module.exports.process = function (ele, opts) {
    if (!opts[this.name] || ele.type !== 'tag' ||
       !knife.isVoidElement(ele.name)) {
        return null;
    }

    // element is a void element and must close itself
    if (knife.isSelfClosing(ele)) {
        return null;
    }

    return {
        index: ele.index,
        line: ele.openLineCol[0],
        column: ele.openLineCol[1],
        msg: 'void element should close itself'
    };
};
