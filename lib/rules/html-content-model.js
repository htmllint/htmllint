var Issue = require('../issue');

module.exports = {
    name: 'html-content-model',
    on: ['tag'],
    filter: ['html']
};

module.exports.lint = function (elt, opts) {
    if (!opts[this.name]) {
        return [];
    }
    var legal_children = ['head', 'body'];

    return elt.children.filter(function (e) {
        return (e.type === 'tag' && (legal_children.indexOf(e.name) === -1));
    }).map(function (e) {
        return new Issue('E044', e.openLineCol);
    });
};
