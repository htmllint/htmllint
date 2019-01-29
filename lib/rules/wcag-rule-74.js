var Issue = require('../issue');
var lodash = require('lodash');

module.exports = {
  name: 'wcag-rule-74',
  on: ['tag'],
  filter: ['label'],
  desc: [
    'a rule from WCAG',
    'http://oaa-accessibility.org/wcag20/rule/74/',
    'The label element should not encapsulate select and textarea elements.'
  ].join('\n')
};

module.exports.lint = function (element, opts) {
    var itterateTree = (element) => {
        if(element.name==="select" || element.name==='textarea'){
            return true;
        }
        else {
            return lodash.some(element.children,itterateTree)
        }
    }
    return lodash.some(element.children,itterateTree)
    ? new Issue('E062', element.openLineCol)
    : [];
};
