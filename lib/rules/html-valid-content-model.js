var Issue = require('../issue');

module.exports = {
    name: 'html-valid-content-model',
    on: ['tag'],
    filter: ['html']
};

module.exports.lint = function (elt, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var output = [];
    var seenChildren = [];

    elt.children.forEach(function(e) {
        if (!e.type === 'tag') return;
        if (e.name !== 'head' && e.name !== 'body') {
            output.push(new Issue('this tag not allowed as child', e.openLineCol));
        } else if (seenChildren.indexOf(e.name) !== -1) {
            output.push(new Issue('only one head/body allowed', e.openLineCol));
        } else {
            seenChildren.push(e.name);
        }
    });

    if (seenChildren.length > 1 && seenChildren[0] !== 'head') {
        output.push(new Issue('wrong order', e.openLineCol));
    }

    return output;
};
