var knife = require('../knife');

module.exports = {
    name: 'attr-name-style',
    on: ['attr']
};

module.exports.lint = function (attr, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }

    var verify = knife.getFormatTest(format);

    return verify(attr.name)
      ? []
      : {
            index: attr.nameIndex,
            line: attr.nameLineCol[0],
            column: attr.nameLineCol[1],
            msg: 'attribute names must match the format: ' + format
        };
};
