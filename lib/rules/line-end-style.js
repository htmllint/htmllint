module.exports = {
    name: 'line-end-style',
    on: ['line']
};

module.exports.lint = function (line, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }
    format = format.toLowerCase();

    var regex = {
        cr: /[^\n\r]\r$/,
        lf: /[^\n\r]\n$/,
        crlf: /[^\n\r]\r\n$/
    }[format];
    var len = line.line.length;

    return regex.test(line.line) ? [] : {
        name: this.name,
        line: line.row,
        column: len - (line.line[len - 2] === '\r'),
        msg: 'Line ending does not match format: ' + format
    };
};