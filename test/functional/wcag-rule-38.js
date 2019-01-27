module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<a href="/myHref >A</a>',
        opts: {
            'wcag-rule-38': false
        },
        output: 0
    },
    {
        desc: 'should ignore a tags that don\'t have a href',
        input: '<a>A</a>',
        opts: {
            'wcag-rule-38': true
        },
        output: 0
    },
    {
        desc: 'should fail when set to true',
        input: '<a href=\'/myHref\' >A</a>',
        opts: {
            'wcag-rule-38': true
        },
        output: 1
    },
    {
        desc: 'if content length>=4 and has href there is no issue',
        input: '<a href=\'/myHref\' >Four</a>',
        opts: {
            'wcag-rule-38': true
        },
        output: 0
    }
];
