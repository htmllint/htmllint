var Issue = require('../issue');

module.exports = {
  name: 'wcag-rule-78',
  on: ['tag'],
  filter: ['button'],
  desc: [
    'a rule from WCAG',
    'http://oaa-accessibility.org/wcag20/rule/78/',
    'Each button element must contain content'
  ].join('\n')
};

module.exports.lint = function (element, opts) {
  return element.children.length===0
    ? new Issue('E061', element.openLineCol)
    : [];
};
