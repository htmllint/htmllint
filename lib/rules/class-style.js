var lodash = require('lodash'),
    knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'class-style',
    on: ['attr'],
    filter: ['class']
};

module.exports.lint = function (attr, opts) {
    var format = opts[this.name] || opts['id-class-style'];
    if (!format) {
        return [];
    }

    var v = attr.value;
    // Breaks if there is an SOH character in your class or id name.
    // Don't do that.
    var ignore = opts['id-class-ignore-regex'];
    if (ignore) { v = v.replace(new RegExp(ignore), '\u0001'); }

    var verify = knife.getFormatTest(format);
    var cssclasses = v.split(/\s+/);

    return lodash.flatten(cssclasses.map(function(c) {
        return (c.indexOf('\u0001') !== -1 || verify(c)) ? [] :
            new Issue('E011', attr.valueLineCol, { format: format, 'class': c });
    }));
};
