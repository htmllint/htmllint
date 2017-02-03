var Issue = require('../issue'),
    proc = require('../processOption');

module.exports = {
    name: 'attr-order',
    on: ['tag'],
    desc: [
'A list of attribute names, or `false`. If set, any attributes present in',
'the list must be ordered as they are in the list.'
].join('\n'),
    process: proc.arrayOfStr
};

module.exports.lint = function (element, opts) {
    var order = opts[this.name],
        attrs = element.attribs,
        found = [],
        lastpos = 0,
        lastname,
        issues = [];
    order.forEach(function(pattern) {
        var r = new RegExp(pattern);
        Object.keys(attrs).forEach(function(key) {
            if (r.test(key) && found.indexOf(key) == -1) {
                var a = attrs[key];
                var pos = a.nameIndex;
                found.push(key);
                if (pos > lastpos) {
                    lastpos = pos;
                    lastname = pattern;
                } else {
                    issues.push(new Issue('E043', a.nameLineCol,
                        { attribute: pattern, previous: lastname }));
                }
            }
        });
    });

    return issues;
};
