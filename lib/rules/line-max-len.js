var Issue = require('../issue'),
    proc = require('../processOption');

module.exports = {
    name: 'line-max-len',
    on: ['line'],
    options: [{
        desc: 'The value of this option is either `false` or a positive integer. If it is a number, the length of each line must not exceed that number.',
        process: proc.posInt
    }, {
        name: 'line-max-len-ignore-regex',
        desc: 'The value is either a string giving a regular expression or `false`. If set, lines with names matching the given regular expression are ignored for the `line-length` rule. For example, lines with long `href` attributes can be excluded with regex `href`.',
        process: proc.regex,
        rules: []
    }]
};

module.exports.lint = function (line, opts) {
    var maxLength = opts[this.name];
    var ignoreRegExp = opts[this.name + '-ignore-regex'];
    var lineText;
    var len;
    var pos;

    lineText = line.line.replace(/(\r\n|\n|\r)$/, '');

    if (ignoreRegExp && ignoreRegExp.test(lineText)) {
        return [];
    }

    len = lineText.length;

    if (len <= maxLength) {
        return [];
    }

    pos = [line.row, len];

    return new Issue('E040', pos, { maxlength: maxLength, length: len });
};
