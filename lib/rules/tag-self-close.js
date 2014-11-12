var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'tag-self-close',
    on: ['tag']
};

module.exports.lint = function (ele, opts) {
    if (!opts[this.name] ||
        !knife.isVoidElement(ele.name) ||
       knife.isSelfClosing(ele)) {
        return [];
    }

    return new Issue('E018', ele.openLineCol);
};
