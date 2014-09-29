module.exports = {
    name: 'attr-name-style',
    description: 'If set, attribute names must conform to the given format.',
    default: 'lowercase'
};

// Duplicated from id_class_value.js
function test(reg) {
    return function (s) {
        return reg.test(s);
    };
}
var verifyFormat = {
    lowercase: test(/^[a-z][a-z\d]*$/),
    underscore: test(/^[a-z][a-z\d]*(_[a-z][a-z\d]*)*$/),
    dash: test(/^[a-z][a-z\d]*(-[a-z][a-z\d]*)*$/),
    camel: test(/^[a-zA-Z][a-zA-Z\d]*$/)
};
module.exports.process = function (element, opts) {
    var format = opts['attr-name-style'];
    if (format === false) {
        return [];
    }
    format = format || this.default;
    var verify = verifyFormat[format];
    if (!Object.keys(element.attribs).every(verify)) {
        return {
            index: element.index,
            msg: 'attribute names must match the format: ' + format
        };
    }
};
