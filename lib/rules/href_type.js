var domUtils = require('htmlparser2').DomUtils;

module.exports = {
    name: 'href-type',
    description: [
        'If set to absolute, all links must be absolute',
        'If set to relative, all links must be relative.'
    ].join('')

};

module.exports.process = function (element, opts) {
    var format = opts['href-type'],
        isAbsLink = element.attribs && element.attribs.hasOwnProperty('href') && (element.attribs.href.search('://') !== -1),
        isRelLink = !isAbsLink;
    if (format === false) {
        return [];
    }
    format = format || this.default;

    if ((format === 'absolute' && isRelLink) || (format === 'relative' && isAbsLink)) {
        return {
            index: element.index,
            msg: 'use only ' + format + ' links'
        };
    }
};