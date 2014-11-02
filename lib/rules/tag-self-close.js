var knife = require('../knife');

module.exports = {
    name: 'tag-self-close',
    on: ['tag']
};

module.exports.lint = function (ele, opts) {
    if (!opts[this.name] || !knife.isVoidElement(ele.name)) {
        return [];
    }

    // element is a void element and must close itself
    if (knife.isSelfClosing(ele)) {
        return [];
    }

    return {
        name: this.name,
        index: ele.index,
        line: ele.openLineCol[0],
        column: ele.openLineCol[1],
        msg: 'void element should close itself'
    };
};