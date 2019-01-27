var Issue = require('../issue');
var lodash = require('lodash');

module.exports = {
  name: 'wcag-rule-38',
  on: ['tag'],
  filter: ['a'],
  desc: [
    'a rule from WCAG',
    'only triggers if the link has a link; only errors if length is between 4',
    'http://oaa-accessibility.org/wcag20/rule/38/',
    'Link text should be as least four 4 characters long'
  ].join('\n')
};

module.exports.lint = function (element, opts) {
  //it's not a link if it doesn't have an href

  if (!element.attribs.href || !element.attribs.href.value) {
    return [];
  }
  
  var textElements = lodash.filter(element.children, (node) => { return node.type == 'text' });
  var content = textElements.map((textElement) => { return textElement.data }).join('').trim();
  length = content.length
  console.log('length'+length)
  return length < 4
    ? new Issue('WC38', element.openLineCol, { 'content': content, 'length': length })
    : [];
};
