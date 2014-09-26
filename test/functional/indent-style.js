module.exports = [
    {
        desc: 'should match spaces when configured for tabs',
        input: [
            '<body>',
            '  <p>hello<p>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-style': 'tabs' },
        output: 1
    }, {
        desc: 'should match tabs when configured for spaces',
        input: [
            '<body>',
            '\t<p> ello</p>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-style': 'spaces' },
        output: 1
    }, {
        desc: 'should match mixed indents',
        input: [
            '<body>',
            '\t <p>this not okay</p>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-style': 'nonmixed' },
        output: 1
    }
];

// TODO: remove pending tests
module.exports = [];
