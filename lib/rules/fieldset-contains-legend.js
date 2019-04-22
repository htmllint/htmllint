var Issue = require('../issue');
var lodash = require('lodash');

module.exports = {
    name: 'fieldset-contains-legend',
    on: ['tag'],
    filter: ['fieldset'],
    desc: [
        'WCAG rule [73](http://oaa-accessibility.org/wcag20/rule/73/):',
        'Each `fieldset` element should contain a `legend` element.'
    ].join('\n')
};

module.exports.lint = function (element, opts) {
    var hasLegend = function (element) {
        return element.name === 'legend';
    }
    return lodash.some(element.children,hasLegend)
        ? []
        : new Issue('E063', element.openLineCol);
};
