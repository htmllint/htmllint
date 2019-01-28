module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<input type="button">',
        opts: {
            'wcag-rule-77': false
        },
        output: 0
    },
    {
        desc: 'should fail when set to true with type button',
        input: '<input type="button">',
        opts: {
            'wcag-rule-77': true
        },
        output: 1
    },
    {
        desc: 'should fail when set to true with type submit',
        input: '<input type="submit">',
        opts: {
            'wcag-rule-77': true
        },
        output: 1
    },
    {
        desc: 'should fail when set to true with type reset',
        input: '<input type="reset">',
        opts: {
            'wcag-rule-77': true
        },
        output: 1
    },
    {
        desc: 'should pass when type is not button submit or reset',
        input: '<input type="radio">',
        opts: {
            'wcag-rule-77': true
        },
        output: 0
    },
    {
        desc: 'should pass when there is a title',
        input: '<input type="button" title="blah">',
        opts: {
            'wcag-rule-77': true
        },
        output: 0
    },
    {
        desc: 'should pass when there is a value',
        input: '<input type="button" value="blah">',
        opts: {
            'wcag-rule-77': true
        },
        output: 0
    }
];
