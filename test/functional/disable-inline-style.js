module.exports = [
    {
        desc: 'should not match style elements',
        input: '<body><style>hello</style></body>',
        output: 0
    }, {
        desc: 'should match style attributes',
        input: '<button style="color: red;"></button>',
        output: 1
    }
];
