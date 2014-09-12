var domUtils = require('htmlparser2').DomUtils;

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
module.exports.process = function (dom, opts) {
    var format = opts["id-class-value"];
    if (!format) return [];
    var verify = verifyFormat[format];
    return domUtils.findAll(function(ele) {
        var a = ele.attribs;
        return  ("id" in a ? (!verify(a.id)) : false) ||
                ("class" in a ? (!verify(a.class)) : false);
    }, dom).map(function (ele) {
        return {
            index: ele.index,
            msg: 'ids and classes must match the format: '+format
        };
    });
};
