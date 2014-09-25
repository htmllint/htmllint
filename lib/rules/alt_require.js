var domUtils = require('htmlparser2').DomUtils;

module.exports = {
    name: 'alt-require',
    trigger: ['img'],
    description: [
        'If set, the `alt` property must be set for image tags'
    ].join('')
};

module.exports.process = function (element, opts) {
        if(!(element.attribs && element.attribs.hasOwnProperty('alt') && (element.attribs.alt !== "")))
        {
            return {
                index: element.index,
                //line: element.location.line,
                //column: element.location.column,
                msg: 'the `alt` property must be set for image tags.'
            };
        }
};
