var lodash = require('lodash'),
    knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'id-style',
    on: ['attr'],
    filter: ['id']
};

module.exports.lint = function (attr, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }

    var v = attr.value;
    // Breaks if there is an SOH character in your class or id name.
    // Don't do that.
    var ignore = opts['id-class-ignore-regex'];
    if (ignore) { v = v.replace(new RegExp(ignore), '\u0001'); }

    var verify = knife.getFormatTest(format);
    var ids = v.split(/\s+/);

    return lodash.flatten(ids.map(function(id) {
        return (id.indexOf('\u0001') !== -1 || verify(id)) ? [] :
            new Issue('E011', attr.valueLineCol, { format: format, id: id });
    }));
};
