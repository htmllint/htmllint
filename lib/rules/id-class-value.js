var knife = require('../knife');

module.exports = {
    name: 'id-class-value',
    description: 'If set, ids and classes must fit the given format.'
};

module.exports.process = function (element, opts) {
    var format = opts[this.name];
    if (!format || element.type !== 'tag') {
        return [];
    }

    var verify = knife.getFormatTest(format),
        as = element.attribs;
    var issues = [];
    ['id', 'class'].map(function(s) {
        if (!(s in as)) { return; }
        var a = as[s];
        if (!verify(a.value)) {
            issues.push({
                index: a.valueIndex,
                line: a.valueLineCol[0],
                column: a.valueLineCol[1],
                msg: 'ids and classes must match the format: ' + format
            });
        }
    });
    return issues;
};
