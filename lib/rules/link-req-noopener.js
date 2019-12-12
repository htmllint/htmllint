var knife = require('../knife'),
    Issue = require('../issue'),
    proc = require('../process_option');

module.exports = {
    name: 'link-req-noopener',
    on: ['tag'],
    filter: ['a'],
    desc: [
'If set, each `a` tag with `target="_blank"` must have a',
'`rel="noopener"` or `rel="noreferrer"` attribute.'
].join('\n')
};

module.exports.lint = function (element, opts) {
    function getVal(a, value) {
        return a && a.value;
    }

    var noopen = /(^| )(noopener|noreferrer|noopener\snoreferrer)( |$)/;

    var attrs = element.attribs;
    if (getVal(attrs.target) === '_blank' &&
        !noopen.test(getVal(attrs.rel))) {
        return new Issue('E058', element.openLineCol);
    }
    return [];
};
