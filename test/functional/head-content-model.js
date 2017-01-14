module.exports = [
    {
        desc: 'head-div should pass when head-content-model set to false',
        input: '<head><div></div></head>',
        opts: { 'head-content-model': false },
        output: 0
    }, {
        desc: 'head-div should fail when head-content-model set to true',
        input: '<head><div></div></head>',
        opts: { 'head-content-model': true },
        output: 1
    }, {
        desc: 'should pass when no head is present',
        input: '<html><body></body></html>',
        opts: { 'head-content-model': true },
        output: 0
    }, {
        desc: 'legal elements in head should pass',
        input: '<head><title></title><link></link><script></script><style></style><template></template><noscript></noscript><meta></meta></head>',
        opts: { 'head-content-model': true },
        output: 0
    }, {
        desc: 'illegal elements in head should fail',
        input: '<head><title></title><link></link><div></div></head>',
        opts: { 'head-content-model': true },
        output: 1
   }, {
        desc: 'empty head should pass',
        input: '<head></head>',
        opts: { 'head-content-model': true },
        output: 0
    }
];
