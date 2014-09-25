var domUtils = require('htmlparser2').DomUtils;

module.exports = {
    name: 'disable-inline-style',
    description: [
        'If set, inline styles (using the `style` attribute) ',
        'may not be used.'
    ].join('')
};

module.exports.process = function (element, opts) {
    if (element.attribs && element.attribs.hasOwnProperty('style')) {
        return {
            index: element.index,
            msg: 'do not use inline styles'
        };
    }
};