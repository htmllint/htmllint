var Issue = require('../issue');

module.exports = {
    name: 'html-content-model',
    on: ['tag'],
    filter: ['html']
};

module.exports.lint = function (elt, opts) {
    var output = [];
    var legal_children = ['head', 'body'];

    var illegal_children = elt.children.filter(function (e) {
        return (e.type === 'tag' && (legal_children.indexOf(e.name) === -1));
    });

    if (opts['html-content-model'] && illegal_children.length) {
        output.push(new Issue('E043', illegal_children[0].openLineCol));
    }
    return output;
};
