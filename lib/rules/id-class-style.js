var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'id-class-style',
    on: ['attr'],
    filter: ['id', 'class']
};

module.exports.lint = function (attr, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }

    var verify = knife.getFormatTest(format);
    var cssclasses = attr.value.split(' ');

    for (var cssclass in cssclasses) {
        if (cssclasses.hasOwnProperty(cssclass)) {
            if (!verify(cssclasses[cssclass])) {
                return new Issue('E011', attr.valueLineCol, { format: format });
            }
        }
    }
    return [];
};
