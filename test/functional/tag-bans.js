module.exports = [
    {
        desc: 'should not match div by default',
        input: '<body><div><p>This is text yo</p></div></body>',
        output: 0
    }, {
        desc: 'should match options if user sets them',
        input: '<body><button style=""></button><main></main></body>',
        opts: { 'tag-bans': ['button', 'main'] },
        output: 2
    }, {
        desc: 'should not match defaults if user sets new elements in options',
        input: '<body><style></style><i></i></body>',
        opts: { 'tag-bans': ['button', 'main'] },
        output: 0
    }, {
        desc: 'should not match when disabled',
        input: '<body><button style=""></button><main></main></body>',
        opts: { 'tag-bans': false },
        output: 0
    }, {
        desc: 'should fail if not given a list',
        input: '',
        opts: { 'tag-bans': 'main' },
        output: 1
    }, {
        desc: 'should fail if not given a list of strings',
        input: '',
        opts: { 'tag-bans': [3, 4, 5] },
        output: 1
    }, {
        desc: 'should be case insensitive',
        input: '<body><BUTTON style=""></BUTTON><main></main></body>',
        opts: { 'tag-bans': ['button', 'maIN'] },
        output: 2
    }
];
