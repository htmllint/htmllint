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
    if (!format) {
        return [];
    }

    if ((format === 'absolute' && isRelLink) || (format === 'relative' && isAbsLink)) {
        return {
            index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: 'use only ' + format + ' links'
        };
    }
};
