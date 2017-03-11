var Issue = require('../issue'),
    proc = require('../process_option');

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
        lastpos = 0,
        lastname,
        issues = [];
    order.forEach(function(name) {
        if (!attrs.hasOwnProperty(name)) return;
        var a = attrs[name];
        var pos = a.nameIndex;
        if (pos > lastpos) {
            lastpos = pos;
            lastname = name;
        } else {
            issues.push(new Issue('E043', a.nameLineCol,
                { attribute: lastname, previous: name }));
        }
    });

    return issues;
};
