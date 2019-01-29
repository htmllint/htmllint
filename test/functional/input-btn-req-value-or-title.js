module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<input type="button">',
        opts: {
            'input-btn-req-value-or-title': false
        },
        output: 0
    },
    {
        desc: 'should fail when set to true with type button',
        input: '<input type="button">',
        opts: {
            'input-btn-req-value-or-title': true
        },
        output: 1
    },
    {
        desc: 'should fail when set to true with type submit',
        input: '<input type="submit">',
        opts: {
            'input-btn-req-value-or-title': true
        },
        output: 1
    },
    {
        desc: 'should fail when set to true with type reset',
        input: '<input type="reset">',
        opts: {
            'input-btn-req-value-or-title': true
        },
        output: 1
    },
    {
        desc: 'should pass when type is not button submit or reset',
        input: '<input type="radio">',
        opts: {
            'input-btn-req-value-or-title': true
        },
        output: 0
    },
    {
        desc: 'should pass when there is a title',
        input: '<input type="button" title="blah">',
        opts: {
            'input-btn-req-value-or-title': true
        },
        output: 0
    },
    {
        desc: 'should pass when there is a value',
        input: '<input type="button" value="blah">',
        opts: {
            'input-btn-req-value-or-title': true
        },
        output: 0
    }
];
