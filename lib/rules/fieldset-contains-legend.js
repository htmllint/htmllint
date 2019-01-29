var Issue = require('../issue');
var lodash = require('lodash');

module.exports = {
  name: 'fieldset-contains-legend',
  on: ['tag'],
  filter: ['fieldset'],
  desc: [
    'a rule from WCAG',
    'http://oaa-accessibility.org/wcag20/rule/73/',
    'Each fieldset element should contain a legend element.'
  ].join('\n')
};

module.exports.lint = function (element, opts) {
    var hasLegend = (element) => {
        if(element.name==="legend"){
            return true;
        }
        else {
            return false;
        }
    }
    return lodash.some(element.children,hasLegend)
    ? []
    : new Issue('E063', element.openLineCol);
};
