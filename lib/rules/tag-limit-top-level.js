var Issue = require('../issue');

module.exports = {
    name: 'tag-limit-top-level',
    on: ['tag'],
    filter: ['html'],
    desc: 'If set, only `<head>` and `<body>` elements may be direct children of the `<html>` tag.'
};

module.exports.lint = function (elt, opts) {
    var legal_children = ['head', 'body'];

    return elt.children.filter(function (e) {
        return e.type === 'tag'
            && legal_children.indexOf(e.name) === -1;
    }).map(function (e) {
        return new Issue('E044', e.openLineCol);
    });
};
