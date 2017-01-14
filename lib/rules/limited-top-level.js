var Issue = require('../issue');

module.exports = {
    name: 'limited-top-level',
    on: ['tag'],
    filter: ['html']
};

module.exports.lint = function (elt, opts) {
    var output = [];
    var legal_children = ['head', 'body'];

    var illegal_children = elt.children.filter(function (e) {
        return (e.type === 'tag' && !legal_children.includes(e.name));
    });

    if (opts['limited-top-level'] && illegal_children.length) {
        output.push(new Issue('E043', illegal_children[0].openLineCol));
    }
    return output;
};
