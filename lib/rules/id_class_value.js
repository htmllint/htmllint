module.exports = {
    name: 'id-class-value',
    description: 'If set, ids and classes must fit the given format.',
    default: 'underscore'
};

function test(reg) { return function(s) { return reg.test(s); }; }
var verifyFormat = {
    lowercase:  test(/^[a-z][a-z\d]*$/),
    underscore: test(/^[a-z][a-z\d]*(_[a-z][a-z\d]*)*$/),
    dash:       test(/^[a-z][a-z\d]*(-[a-z][a-z\d]*)*$/),
    camel:      test(/^[a-zA-Z][a-zA-Z\d]*$/)
};
module.exports.process = function (element, opts) {
    var format = opts["id-class-value"];
    if (format === false) {
        return [];
    }
    format = format || this.default;

    var verify = verifyFormat[format],
        a = element.attribs;
    if ("id" in a && !verify(a.id) || "class" in a && !verify(a.class)) {
        return {
            index: element.index,
            msg: 'ids and classes must match the format: '+format
        };
    }
};
