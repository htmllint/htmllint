module.exports = {
    name: 'line-end-style',
    description: 'Line endings must conform to the given option.'
};

module.exports.scan = function (line, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }
    format = format.toLowerCase();

    var regex = {
        cr:   /[^\n\r]\r$/,
        lf:   /[^\n\r]\n$/,
        crlf: /[^\n\r]\r\n$/
    }[format];
    var len = line.line.length;

    if (!regex.test(line.line)) {
        return {
            row: line.row,
            column: len - (line.line[len - 2] === '\r'),
            msg: 'Line ending does not match format: ' + format
        };
    }
};
