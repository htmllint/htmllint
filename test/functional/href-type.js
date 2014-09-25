module.exports = [
    {
        desc: 'should not match absolute links given absolute option',
        input: '<a href="http://www.google.com"></a>',
        output: 0
    }, {
        desc: 'should match relative links given absolute option',
        input: '<a href="/dog/cat"></a>',
        opts: { 'href-type': 'absolute' },
        output: 1
    }, {
        desc: 'should not match relative links given relative option',
        input: '<a href="/dog/cat"></a>',
        opts: { 'href-type': 'relative' },
        output: 0
    }, {
        desc: 'should match absolute links given relative option',
        input: '<a href="http://www.google.com"></a>',
        opts: { 'href-type': 'relative' },
        output: 1
    }, {
        desc: 'should not match any links given false option',
        input: '<a href="/dog/cat"></a><a href="http://www.google.com"></a>',
        opts: { 'href-type': false },
        output: 0
    }
];
