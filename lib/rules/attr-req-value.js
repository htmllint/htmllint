var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'attr-req-value',
    on: ['attr']
};

module.exports.lint = function (attr, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var c = attr.attributeContext;
    if ((attr.value === '' && (!c) && (!knife.isBooleanAttr(attr.name)))
            || /^[^'"]*=[^'"]*=/.test(c)) {
        return new Issue('E006', attr.valueLineCol);
    } else {
        return [];
    }
};
