module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<body><div><p class="hey hey">Text</p></div></body>',
        opts: { 'class-no-dup': false },
        output: 0
    },
    {
        desc: 'should pass when there are no duplicates',
        input: '<body><div><p class="hey hi">Text</p></div></body>',
        opts: { 'class-no-dup': true },
        output: 0
    },
    {
        desc: 'should catch duplicates when set to true',
        input: '<body><div><p class="hey hey">Text</p></div></body>',
        opts: { 'class-no-dup': true },
        output: 1
    },
    {
        desc: 'should catch multiple duplicates in one class',
        input: '<body><div><p class="hey hey hi ho ho">Text</p></div></body>',
        opts: { 'class-no-dup': true },
        output: 2
    }
];
