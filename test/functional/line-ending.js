var input = [
    '<body>\n',
    '  <p>\n',
    '    some\r',
    '    text\n',
    '  <p>\r\n',
    '</body>\r'
].join('');

module.exports = [
    {
        desc: 'should match CR and CRLF when set to LF',
        input: input,
        opts: { 'line-ending': 'lf' },
        output: 3
    }, {
        desc: 'should match LF and CRLF when set to CR',
        input: input,
        opts: { 'line-ending': 'cr' },
        output: 4
    }, {
        desc: 'should match CR and LF when set to CRLF',
        input: input,
        opts: { 'line-ending': 'crlf' },
        output: 5
    }, {
        desc: 'should not match anything when set to false',
        input: input,
        opts: { 'line-ending': false },
        output: 0
    }
];
