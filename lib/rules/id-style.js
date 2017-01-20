var Issue = require('../issue'),
    proc = require('../processOption');

module.exports = {
    name: 'id-style',
    on: ['attr'],
    filter: ['id'],
    options: [{
        name: 'id-class-style',
        desc: 'A format specifier, or `false`. If set, `id`s and `class`es must fit the given format. May be overridden by `class-style` for `class`es.',
        process: proc.format,
        rules: ['class-style', 'id-style']
    }, {
        name: 'id-class-ignore-regex',
        desc: 'The value is either a string giving a regular expression or `false`. If set, `id`s and `class`es matching the given regular expression are ignored for the `id-class-style` rule. For example, excluding `{{...}}` classes used by Angular and other templating methods can be done with the regex `{{.*?}}`.',
        process: function (ignore) {
            return ignore
                ? new RegExp('(' + ignore + ')|\\s*$|\\s+', 'g')
                : undefined;
        },
        rules: [] // 'class', 'id-style'
    }]
};

module.exports.lint = function (attr, opts) {
    var format = opts['id-class-style'];

    var v = attr.value;

    var ignore = opts['id-class-ignore-regex'];
    if (ignore !== false && (new RegExp(ignore)).test(v)) { return []; }

    if (format.test(v)) { return []; }

    return new Issue('E011', attr.valueLineCol, { format: format.desc, id: v });
};
