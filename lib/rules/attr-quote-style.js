var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'attr-quote-style',
    on: ['tag']
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

var formatNames = {
    double: 'double quoted',
    single: 'single quoted',
    quoted: 'quoted'
};

module.exports.lint = function (ele, opts) {
    if (!opts[this.name]) {
        return [];
    }

    // remove the element name from the open text
    var attribStr = ele.open.slice(ele.name.length);
    // remove any ending whitespace and '/' char
    attribStr = attribStr.replace(endTrimRegex, '');

    // parse the attrs
    var attrs = knife.parseHtmlAttrs(attribStr),
        format = formats[opts[this.name]] || formats.quoted,
        formatName = formatNames[opts[this.name]] || formatNames.quoted,
        issues = [];

    attrs.forEach(function (attr) {
        var v = attr.valueRaw;
        if (v && (v.length > 0) && !format.test(v)) {
            var msgData = {
                attribute: attr.name,
                format: formatName
            };

            var a = ele.attribs[attr.name];
            issues.push(new Issue('E005', a.valueLineCol, msgData));
        }
    });

    return issues;
};
