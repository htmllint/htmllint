var Issue = require('../issue'),
    proc = require('../processOption');

module.exports = {
    name: 'href-style',
    on: ['tag'],
    filter: ['a'],
    desc: '* "absolute": All `href` tags must use absolute URLs.\n* "relative": All `href` tags must use relative URLs.\n* `false`: No restriction.',
    process: proc.boolPlus('absolute')
};

module.exports.lint = function (element, opts) {
    var format = opts[this.name];

    // Should return an issue, since a without href is bad
    if (!element.attribs || !element.attribs.hasOwnProperty('href')) {
        return [];
    }

    // Link must be absolute iff specified format is absolute
    return ((format === 'absolute') ===
        (element.attribs.href.value.search('://') !== -1)) ? [] :
        new Issue('E009', element.openLineCol, { format: format });
};
