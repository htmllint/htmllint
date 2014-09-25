var domUtils = require('htmlparser2').DomUtils;

module.exports = {
    name: 'disallowed-tags',
    description: [
        'The value of this option is a list of strings,',
        'each of which is a tag name. Tags with any of',
        'the given names are disallowed.'
    ].join(''),
    default: ['style', 'b', 'i']
};

module.exports.process = function (dom, opts) {
    var disclude = (opts && opts[module.exports.name]) ?
            opts[module.exports.name] : module.exports.default;

    return domUtils.findAll(function testForElementName(ele) {
        return disclude.indexOf(ele.name.toLowerCase()) > -1;
    }, dom).map(function (ele) {
        return {
            index: ele.index,
            msg: 'element [' + ele.name + '] not allowed'
        };
    });
};
