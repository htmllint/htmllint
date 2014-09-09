var domUtils = require('htmlparser2').DomUtils;

module.exports = {
    name: 'tag-name-lowercase',
    description: 'If set, tag names must be lowercase.'
};

module.exports.process = function (dom, opts) {
    return domUtils.findAll(function testForUpperCase(ele) {
        return (/[A-Z]/).test(ele.name);
    }, dom).map(function (ele) {
        return {
            index: ele.index,
            msg: 'tag names must be lowercase'
        };
    });
};
