module.exports = [
    {
        desc: 'html-div should pass when limited-top-level set to false',
        input: '<html><div></div></html>',
        opts: { 'limited-top-level': false },
        output: 0
    }, {
        desc: 'html-div should fail when limited-top-level set to true',
        input: '<html><div></div></html>',
        opts: { 'limited-top-level': true },
        output: 1
    }, {
        desc: 'head should pass when no html is present',
        input: '<head></head>',
        opts: { 'limited-top-level': true },
        output: 0
    }, {
        desc: 'html-head-body should pass',
        input: '<html><head></head><body></body></html>',
        opts: { 'limited-top-level': true },
        output: 0
    }, {
        desc: 'html-head-div-body should fail',
        input: '<html><head></head><div></div><body></body></html>',
        opts: { 'limited-top-level': true },
        output: 1
   }, {
        desc: 'html-head-body should pass',
        input: '<html><head></head><body><div></div></body></html>',
        opts: { 'limited-top-level': true },
        output: 0
    }
];
