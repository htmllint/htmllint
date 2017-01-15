var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'attr-req-value',
    on: ['attr'],
    desc: 'If set, attribute values cannot be empty. This does not disallow the value `\'\'`.'
};

module.exports.lint = function (attr, opts) {
    var v = attr.rawEqValue;
    if (v ? /^[^'"]+=/.test(v) : !knife.isBooleanAttr(attr.name)) {
        return new Issue('E006', attr.valueLineCol);
    }

    return [];
};
