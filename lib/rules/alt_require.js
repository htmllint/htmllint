var domUtils = require('htmlparser2').DomUtils;

module.exports = {
    name: 'alt-require',
    trigger: 'img',
    description: [
        'If set, the `alt` property must be set for image tags'
    ].join('')

};

module.exports.process = function (dom, opts) {
    return domUtils.findAll(function testForLinkType(ele) {

        hasAltText = ele.attribs && ele.attribs.hasOwnProperty('alt') && (ele.attribs.alt !== "");
        //return true if angry
        return !hasAltText;
    }, dom).map(function (ele) {
        return {
            index: ele.index,
            msg: 'the `alt` property must be set for image tags.'
        };
    });
};
