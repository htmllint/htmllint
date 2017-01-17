var Issue = require('../issue'),
    proc = require('../processOption');

module.exports = {
    name: 'page-title',
    on: ['tag'],
    filter: ['head'],
    options: [{
        name: 'head-req-title',
        desc: 'If set, any `head` tag in the page must contain a non-empty `title` tag.',
        process: proc.bool
    }, {
        name: 'title-max-len',
        desc: 'The value is either `false` or a nonnegative integer. If nonzero, the length of the text in the `<title>` tag must not exceed the given value.',
        process: proc.posInt
    }, {
        name: 'title-no-dup',
        desc: 'If set, the `<title>` tag must not appear twice in the head.',
        process: proc.bool
    }]
};

module.exports.lint = function (elt, opts) {
    var output = [];
    var titles = elt.children.filter(function (e) {
        return e.type === 'tag' && e.name === 'title';
    });
    if (opts['head-req-title'] &&
            !titles.some(function(t){return t.children.length > 0;})) {
        output.push(new Issue('E027', elt.openLineCol));
    }
    if (opts['title-no-dup'] && titles.length > 1) {
        output.push(new Issue('E028', titles[1].openLineCol,
            { num: titles.length }));
    }

    var maxlen = opts['title-max-len'];
    if (maxlen) { titles.map(function(t) {
        var text = t.children.filter(function(c) {return c.type === 'text';})
            .map(function(c) { return c.data; }).join('');
        if (text.length > maxlen) {
            output.push(new Issue('E029', t.openLineCol,
                { title: text, maxlength: maxlen }));
        }
    }); }

    return output;
};
