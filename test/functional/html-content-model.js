module.exports = [
    {
        desc: 'html-div should pass when html-content-model set to false',
        input: '<html><div></div></html>',
        opts: { 'html-content-model': false },
        output: 0
    }, {
        desc: 'html-div should fail when html-content-model set to true',
        input: '<html><div></div></html>',
        opts: { 'html-content-model': true },
        output: 1
    }, {
        desc: 'head should pass when no html is present',
        input: '<head></head>',
        opts: { 'html-content-model': true },
        output: 0
    }, {
        desc: 'html-head-body should pass',
        input: '<html><head></head><body></body></html>',
        opts: { 'html-content-model': true },
        output: 0
    }, {
        desc: 'html-head-div-body should fail',
        input: '<html><head></head><div></div><body></body></html>',
        opts: { 'html-content-model': true },
        output: 1
   }, {
        desc: 'html-head-body should pass',
        input: '<html><head></head><body><div></div></body></html>',
        opts: { 'html-content-model': true },
        output: 0
    }
];
