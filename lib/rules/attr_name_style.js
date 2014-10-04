var knife = require('../knife');

module.exports = {
    name: 'attr-name-style',
    description: 'If set, attribute names must conform to the given format.'
};

module.exports.process = function (element, opts) {
    var format = opts['attr-name-style'];
    if (!format || element.type !== 'tag') {
        return [];
    }

    var verify = knife.getFormatTest(format);
    if (!Object.keys(element.attribs).every(verify)) {
        return {
            index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: 'attribute names must match the format: ' + format
        };
    }
};
