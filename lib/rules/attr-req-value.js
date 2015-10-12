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
    if ((attr.value === '' && (c === undefined || c.indexOf('=')) < 0 && (!knife.isBooleanAttr(attr.name)))
            || /^[^'"]*=[^'"]*=/.test(c)) {
        return new Issue('E006', attr.valueLineCol);
    }

    return [];
};
