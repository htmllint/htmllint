module.exports = [
    {
        desc: 'should not match style elements',
        input: '<body><style>hello</style></body>',
        opts: { 'attr-bans': ['style'] },
        output: 0
    }, {
        desc: 'should match style attributes',
        input: '<button style="color: red;"></button>',
        opts: { 'attr-bans': ['style'] },
        output: 1
    }, {
        desc: 'should not match when disabled',
        input: '<button style="color: red;"></button>',
        opts: { 'attr-bans': false },
        output: 0
    }, {
        desc: 'should match banned if specified',
        input: '<body banned></body>',
        opts: { 'attr-bans': ['banned'] },
        output: 1
    }, {
        desc: 'should match width if img-req-dimensions is false',
        input: '<img width>',
        opts: { 'attr-bans': ['width'], 'img-req-dimensions': false },
        output: 1
    }, {
        desc: 'should not match width if img-req-dimensions is true',
        input: '<img width>',
        opts: { 'attr-bans': ['width'], 'img-req-dimensions': true },
        output: 0
    }, {
        desc: 'should match height if img-req-dimensions is false',
        input: '<img width height>',
        opts: { 'attr-bans': ['height'], 'img-req-dimensions': false },
        output: 1
    }, {
        desc: 'should not match height if img-req-dimensions is true',
        input: '<img width height>',
        opts: { 'attr-bans': ['height'], 'img-req-dimensions': true },
        output: 0
    }, {
        desc: 'should match width if img-req-dimensions is true and the tag is not an img',
        input: '<button width></button>',
        opts: { 'attr-bans': ['width'], 'img-req-dimensions': true },
        output: 1
    }, {
        desc: 'should match height if img-req-dimensions is true and the tag is not an img',
        input: '<button width height></button>',
        opts: { 'attr-bans': ['height'], 'img-req-dimensions': true },
        output: 1
    }
];
