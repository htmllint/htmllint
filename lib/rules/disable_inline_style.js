var domUtils = require('htmlparser2').DomUtils;

module.exports = {
    name: 'disable-inline-style',
    description: [
        'If set, inline styles (using the `style` attribute) ',
        'may not be used.'
    ].join('')
};

module.exports.process = function (dom, opts) {
    return domUtils.findAll(function testForStyleAttrib(ele) {
        return ele.attribs && ele.attribs.hasOwnProperty('style');
    }, dom).map(function (ele) {
        return {
            index: ele.index,
            msg: 'do not use inline styles'
        };
    });
};
