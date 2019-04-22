var Issue = require('../issue');
var lodash = require('lodash');

module.exports = {
    name: 'input-btn-req-value-or-title',
    on: ['tag'],
    filter: ['input'],
    desc: [
        'WCAG rule [77](http://oaa-accessibility.org/wcag20/rule/77/):',
        'Input elements where type=[button|submit|reset] must have a `value` or `title` attribute.'
    ].join('\n')
};

module.exports.lint = function (element, opts) {
    if (!element.attribs.type || lodash.indexOf(['button','submit','reset'],element.attribs.type.value) === -1) {
        return [];
    }
    return !(element.attribs.value || element.attribs.title)
        ? new Issue('E060', element.openLineCol)
        : [];
};
