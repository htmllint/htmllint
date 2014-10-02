module.exports = {
    name: 'disable-inline-style',
    description: [
        'If set, inline styles (using the `style` attribute) ',
        'may not be used.'
    ].join('')
};

module.exports.process = function (element, opts) {
    if (!opts[this.name]) {
        return null;
    }

    if (element.attribs && element.attribs.hasOwnProperty('style')) {
        return {
            index: element.index,
            msg: 'do not use inline styles'
        };
    }
};
