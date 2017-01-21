var Issue = require('../issue');

module.exports = {
    name: 'id-class-no-ad',
    on: ['attr'],
    filter: ['id', 'class'],
    desc: [
'If set, the values for the `id` and `class` attributes may not',
'use the word "ad".',
'This rule only restricts cases of the substring "ad" surrounded by',
'non-alphanumeric characters.'
].join('\n')
};

module.exports.lint = function (attr, opts) {
    return /(^|[^a-zA-Z0-9])ad([^a-zA-Z0-9]|$)/.exec(attr.value)
        ? new Issue('E010', attr.valueLineCol)
        : [];
};
