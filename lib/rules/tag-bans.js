var lodash = require('lodash'),
    Issue = require('../issue');

module.exports = {
    name: 'tag-bans',
    on: ['dom'],
    filter: ['tag', 'style', 'script'],
    desc: [
'The value of this option is a list of strings, each of which is a tag',
'name. Tags with any of the given names are disallowed.'
].join('\n'),
    process: function (o) {
        return lodash.isArray(o) && lodash.every(o, lodash.isString)
            ? o.map(function(s) { return s.toLowerCase(); }) : undefined;
    }
};

module.exports.lint = function (element, opts) {
    var format = opts[this.name];
    return format.indexOf(element.name.toLowerCase()) < 0
        ? []
        : new Issue('E016', element.openLineCol, { tag: element.name });
};
