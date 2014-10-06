var lodash = require('lodash');
var knife = require('../knife');

module.exports = {
    name: 'attr-value-quotes',
    description: 'Consistent quoting of attribute values'
};

// only need to match the beginning of the raw value
var formats = {
    double: /^"/,
    single: /^'/,
    quoted: /^['"]/
};

// matches any whitespace followed by an optional '/' at
// the end of a string
var endTrimRegex = /\s*\/?$/;

var msgTemplate = lodash.template([
    'the "<%= name %>" attribute is not <%= format %>'
].join(''));
var formatNames = {
    double: 'double quoted',
    single: 'single quoted',
    quoted: 'quoted'
};

module.exports.process = function (ele, opts) {
    if (!opts[this.name] || ele.type !== 'tag') {
        return null;
    }

    // remove the element name from the open text
    var attribStr = ele.open.slice(ele.name.length);
    // remove any ending whitespace and '/' char
    attribStr = attribStr.replace(endTrimRegex, '');

    // parse the attrs
    var attrs = knife.parseHtmlAttrs(attribStr),
        format = formats[opts[this.name]] || formats['quoted'],
        formatName = formatNames[opts[this.name]] || formatNames['quoted'],
        issues = [];

    attrs.forEach(function (attr) {
        if (!format.test(attr.valueRaw)) {
            var msgData = {
                name: attr.name,
                format: formatName
            };

            issues.push({
                index: ele.index,
                line: ele.openLineCol[0],
                column: ele.openLineCol[1],
                msg: msgTemplate(msgData)
            });
        }
    });

    return issues;
};
