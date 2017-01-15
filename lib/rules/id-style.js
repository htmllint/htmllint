var Issue = require('../issue');

module.exports = {
    name: 'id-style',
    on: ['attr'],
    filter: ['id']
};

module.exports.lint = function (attr, opts) {
    var format = opts['id-class-style'];

    var v = attr.value;

    var ignore = opts['id-class-ignore-regex'];
    if (ignore !== false && (new RegExp(ignore)).test(v)) { return []; }

    if (format.test(v)) { return []; }

    return new Issue('E011', attr.valueLineCol, { format: format.desc, id: v });
};
