module.exports = [
    {
        desc: 'html-div should pass when tag-limit-top-level set to false',
        input: '<html><div></div></html>',
        opts: { 'tag-limit-top-level': false },
        output: 0
    }, {
        desc: 'html-div should fail when tag-limit-top-level set to true',
        input: '<html><div></div></html>',
        opts: { 'tag-limit-top-level': true },
        output: 1
    }, {
        desc: 'head should pass when no html is present',
        input: '<head></head>',
        opts: { 'tag-limit-top-level': true },
        output: 0
    }, {
        desc: 'html-head-body should pass',
        input: '<html><head></head><body></body></html>',
        opts: { 'tag-limit-top-level': true },
        output: 0
    }, {
        desc: 'html-head-div-body should fail',
        input: '<html><head></head><div></div><body></body></html>',
        opts: { 'tag-limit-top-level': true },
        output: 1
    }, {
        desc: 'should fail for each illegal element',
        input: '<html><div></div><head></head><div></div><body></body></html>',
        opts: { 'tag-limit-top-level': true },
        output: 2
   }, {
        desc: 'html-head-body should pass',
        input: '<html><head></head><body><div></div></body></html>',
        opts: { 'tag-limit-top-level': true },
        output: 0
    }
];
