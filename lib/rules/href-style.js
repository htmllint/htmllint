module.exports = {
    name: 'href-style',
    on: ['tag'],
    trigger: ['a']
};

module.exports.lint = function (element, opts) {
    var format = opts[this.name];
    if (!format) {
        return [];
    }

    // Should return an issue, since a without href is bad
    if (!element.attribs || !element.attribs.hasOwnProperty('href')) {
        return [];
    }

    // Link must be absolute iff specified format is absolute
    return ((format === 'absolute') ===
            (element.attribs.href.value.search('://') !== -1))
      ? []
      : {
            index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: 'use only ' + format + ' links'
        };
};
