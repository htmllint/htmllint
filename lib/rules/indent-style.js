var Issue = require('../issue'); // TODO

module.exports = {
    name: 'indent-style',
    on: ['line']
};

module.exports.end = function () {
    delete this.current;
};

module.exports.lint = function (line, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }

    // The indent, that is, the whitespace characters before the first
    // non-whitespace character.
    var indent = line.line.slice(0, /[^ \t]/.exec(line.line).index);

    // if there are no tabs or spaces on this line, don't bother
    if (indent.length === 0) {
        return [];
    }

    var space = / /.exec(indent);
    var tab  = /\t/.exec(indent);

    if (!this.current) {
        this.current = space ? 'spaces' : 'tabs';
    }

    // true if we require spaces, false if we require tabs
    var type = ((format === 'spaces') ||
                (format === 'nonmixed' && this.current === 'spaces'));
    var error = type ? tab : space;

    if (!error) {
        return [];
    }

    return new Issue('E024', [line.row, error.index + 1], {
        type: type ? 'Tabs' : 'Spaces'
    });
};
