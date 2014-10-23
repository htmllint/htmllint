var knife = require('../knife');

module.exports = {
    name: 'attr-name-style',
    description: 'If set, attribute names must conform to the given format.'
};

module.exports.process = function (element, opts) {
    var format = opts[this.name];
    if (!format || element.type !== 'tag') {
        return [];
    }

    var verify = knife.getFormatTest(format);

    var issues = [];
    Object.keys(element.attribs).map(function(attr) {
        if (!verify(attr)) {
            var a = element.attribs[attr];
            issues.push({
                index: a.nameIndex,
                line: a.nameLineCol[0],
                column: a.nameLineCol[1],
                msg: 'attribute names must match the format: ' + format
            });
        }
    });
    return issues;
};
