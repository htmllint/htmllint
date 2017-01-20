var Issue = require('../issue'),
    proc = require('../processOption');

module.exports = {
    name: 'class-style',
    on: ['class'],
    desc: 'A format specifier, "none", or `false`. If set, `class`es must fit the given format. If `false`, the value for `id-class-style` is used instead (use `\'none\'` to avoid matching anything).',
    process: function (o) {
        return o === 'none'
            ? { desc: 'none', test: function(s) { return true; } }
            : proc.format(o);
    }
    // 'id-class-style'
};

module.exports.lint = function (classes, opts) {
    var format = opts[this.name] || opts['id-class-style'],
        ignore_class = classes.ignore_class;

    return classes.filter(function(c, i) {
        return !(ignore_class[i] || format.test(c));
    }).map(function(c, i) {
        return new Issue('E011', classes.lineCol,
                         { format: format.desc, 'class': c });
    });
}
