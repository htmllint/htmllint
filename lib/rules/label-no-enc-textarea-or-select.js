var Issue = require('../issue');
var lodash = require('lodash');

module.exports = {
    name: 'label-no-enc-textarea-or-select',
    on: ['tag'],
    filter: ['label'],
    desc: [
        'WCAG rule [74](http://oaa-accessibility.org/wcag20/rule/74/):',
        'The `label` element should not encapsulate `select` and `textarea` elements.'
    ].join('\n')
};

module.exports.lint = function (element, opts) {
    var itterateTree = function (element) {
        if (element.name === 'select' || element.name === 'textarea') {
            return true;
        } else {
            return lodash.some(element.children,itterateTree)
        }
    }
    return lodash.some(element.children,itterateTree)
        ? new Issue('E062', element.openLineCol)
        : [];
};
