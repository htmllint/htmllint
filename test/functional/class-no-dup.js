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
    },

    // class-no-dup-split-separator
    {
        desc: 'should catch duplicates with a custom separator',
        input: '<body><div><p class="hey hey">Text</p></div></body>',
        opts: { 'class-no-dup': true, 'class-no-dup-split-separator': /\s+(?![^{]*})/ },
        output: 1
    },
    {
        desc: 'should catch multiple duplicates with a custom separator',
        input: '<body><div><p class="hey {foo bar} hey hi {foo bar}">Text</p></div></body>',
        opts: { 'class-no-dup': true, 'class-no-dup-split-separator': /\s+(?![^{]*})/ },
        output: 2
    }
];
