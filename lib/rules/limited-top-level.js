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
        return e.type === 'tag' && legal_children.indexOf(e.name) !== -1;
    });

    if (opts['limited-top-level'] && illegal_children.length) {
        output.push(new Issue('E043'));
    }

    return output;
};
