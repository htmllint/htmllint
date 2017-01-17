var Issue = require('../issue');

module.exports = {
    name: 'head-valid-content-model',
    on: ['tag'],
    filter: ['head'],
    desc: 'If set, the content-model of the HEAD element will be enforced: only BASE, LINK, META, NOSCRIPT, SCRIPT, STYLE, TEMPLATE, and TITLE tags are legal children.'
};

module.exports.lint = function (elt, opts) {
    var legal_children = ['base', 'link', 'meta', 'noscript', 'script', 'style', 'template', 'title'];
    var output = [];

    elt.children.forEach(function (e) {
        if (e.type === 'tag' && legal_children.indexOf(e.name) < 0) {
            output.push(new Issue('E045', e.openLineCol));
        }
    });

    return output;
};
