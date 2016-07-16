var Issue = require('../issue');

module.exports = {
    name: 'class-no-dup',
    on: ['attr'],
    filter: ['class']
};

module.exports.lint = function (attr, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var issues = [];
    var v = attr.value;
    var cssclasses = v.split(/\s+/).sort();

    for (var i = 0; i < cssclasses.length - 1; i++) {
        if (cssclasses[i + 1] === cssclasses[i]) {
            issues.push(new Issue('E041', attr.valueLineCol, { classes: v }));
        }
    }

    return issues;
};
