var Issue = require('../issue');

module.exports = {
    name: 'head-content-model',
    on: ['tag'],
    filter: ['head']
};

module.exports.lint = function (elt, opts) {
    var output = [];
    var legal_children = ['base', 'link', 'meta', 'noscript', 'script', 'style', 'template', 'title'];

    var illegal_children = elt.children.filter(function (e) {
        return (e.type === 'tag' && !legal_children.includes(e.name));
    });

    if (opts['head-content-model'] && illegal_children.length) {
        output.push(new Issue('E045', illegal_children[0].openLineCol));
    }
    return output;
};
