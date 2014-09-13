var domUtils = require('htmlparser2').DomUtils;

module.exports = {
    name: 'href-type',
    description: [
        'If set to absolute, all links must be absolute',
        'If set to relative, all links must be relative.'
    ].join('')

};

module.exports.process = function (dom, opts) {
    return domUtils.findAll(function testForLinkType(ele) {
        var disclude = (opts && opts[module.exports.name]) ? opts[module.exports.name] : module.exports.default,
            isAbsLink = false,
            isRelLink = false;

        isAbsLink = ele.attribs && ele.attribs.hasOwnProperty('href') && (ele.attribs.href.search('://') !== -1);
        isRelLink = !isAbsLink;
        //return true if angry
        if (disclude === 'absolute') {
            return isRelLink;
        } else if (disclude === 'relative') {
            return isAbsLink;
        } else {
            return false;
        }
    }, dom).map(function (ele) {
        return {
            index: ele.index,
            msg: [
                'use only ',
                (opts && opts[module.exports.name]) ? opts[module.exports.name] : module.exports.default,
                ' links'
            ].join('')
        };
    });
};
