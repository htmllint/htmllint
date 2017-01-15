var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'attr-name-style',
    on: ['attr']
};

module.exports.lint = function (attr, opts) {
    var format = opts[this.name];

    var ignore = opts['attr-name-ignore-regex'];
    if (ignore && ignore.test(attr.name)) { return []; }

    return format.test(attr.name) ? [] :
        new Issue('E002', attr.nameLineCol, { format: format.name });
};
