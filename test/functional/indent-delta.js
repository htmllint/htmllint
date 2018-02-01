module.exports = [
    {
        desc: 'should work with tabs',
        input: [
            '<body>',
            '\t<p>hello</p>',
            '</body>'
        ].join('\n'),
        opts: {'indent-delta':true },
        output: 0
    }, {
        desc: 'should detect bad tab indent',
        input: [
            '<body>',
            '\t\t\t<p>hello</p>',
            '\t\t\t<p>hello</p>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-delta':true },
        output: 2
    }, {
        desc: 'should work with tabs and spaces',
        input: [
            '<body>',
            '\t<p>hello</p>',
            '  <p>hello</p>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-delta':true, 'indent-width':2 },
        output: 0
    }, {
        desc: 'should detect bad indent with tabs and spaces',
        input: [
            '<body>',
            '\t  <p>hello</p>',
            '  <p>hello</p>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-delta':true, 'indent-width':2 },
        output: 1
    },
]
