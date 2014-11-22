module.exports = [
    {
        desc: 'should match spaces when configured for tabs',
        input: [
            '<body>',
            '  <p>hello</p>',
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
        desc: 'should match tabs when configured for spaces',
        input: [
            '<body>',
            '\t<p> ello</p>',
            '\t<p> ello</p>',
            '\t<p> ello</p>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-style': 'spaces' },
        output: 3
    },
    {
        desc: 'should match inmixed indents',
        input: [
            '<body>',
            '\t <p>this not okay</p>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-style': 'spaces' },
        output: 1
    }, {
        desc: 'should match mixed indents starting with spaces',
        input: [
            '<body>',
            '    <p>this not okay</p>',
            '    <p>this not okay</p>',
            '\t\t\t\t<p>this not okay</p>',
            '\t\t\t\t<p>this not okay</p>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-style': 'nonmixed' },
        output: 2
    }, {
        desc: 'should match mixed indents starting with tabs',
        input: [
            '<body>',
            '\t\t<p>this not okay</p>',
            '\t\t<p>this not okay</p>',
            '      <div>Hey</div>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-style': 'nonmixed' },
        output: 1
    }, {
        desc: 'should not match on false',
        input: [
            '<body>',
            '\t\t<p>this not okay</p>',
            '\t\t<p>this not okay</p>',
            '      <div>Hey</div>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-style': false },
        output: 0
    },
    {
        desc: 'indent-width should match indents with the wrong number of spaces',
        input: [
            '<body>',
            '       <p>this not okay</p>',
            '  \t  <p>this not okay</p>',
            '        <div>Hey</div>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-width': 4 },
        output: 2
    }, {
        desc: 'indent-width should not match when set to false',
        input: [
            '<body>',
            '       <p>this not okay</p>',
            '  \t  <p>this not okay</p>',
            '        <div>Hey</div>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-width': false },
        output: 0
    }, {
        desc: 'indent-width should work with strange indent widths',
        input: [
            '<body>',
            '          <p>this is fine</p>',
            '        <p>this not okay</p>',
            '\t        <div>Hey</div>',
            '</body>'
        ].join('\n'),
        opts: { 'indent-width': 5 },
        output: 2
    }
];
