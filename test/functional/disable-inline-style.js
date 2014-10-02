module.exports = [
    {
        desc: 'should not match style elements',
        input: '<body><style>hello</style></body>',
        opts: { 'disable-inline-style': true },
        output: 0
    }, {
        desc: 'should match style attributes',
        input: '<button style="color: red;"></button>',
        opts: { 'disable-inline-style': true },
        output: 1
    }
];
