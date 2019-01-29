module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<label><select><option value="v1">V1</option><option value="v2">V2</option><option value="v3">V3</option></select></label>',
        opts: {
            'label-no-enc-textarea-or-select': false
        },
        output: 0
    },
    {
        desc: 'should fail when set to true with nested select',
        input: '<label><select><option value="v1">V1</option><option value="v2">V2</option><option value="v3">V3</option></select></label>',
        opts: {
            'label-no-enc-textarea-or-select': true
        },
        output: 1
    },
    {
        desc: 'should fail when set to true with nested textarea',
        input: '<label><textarea></textarea></label>',
        opts: {
            'label-no-enc-textarea-or-select': true
        },
        output: 1
    },
    {
        desc: 'should fail when set to true with 2nd level nested textarea',
        input: '<label><div><textarea></textarea><div></label>',
        opts: {
            'label-no-enc-textarea-or-select': true
        },
        output: 1
    },
    {
        desc: 'should fail when set to true with 2nd level nested select',
        input: '<label><div><select><option value="v1">V1</option><option value="v2">V2</option><option value="v3">V3</option></select></div></label>',
        opts: {
            'label-no-enc-textarea-or-select': true
        },
        output: 1
    },
    {
        desc: 'should pass when set to true with non nested textarea',
        input: '<label></label><textarea></textarea>',
         opts: {
            'label-no-enc-textarea-or-select': true
        },
        output: 0
    },
    {
        desc: 'should pass when set to true with non nested select',
        input: '<label></label><select><option value="v1">V1</option><option value="v2">V2</option></select>',
         opts: {
            'label-no-enc-textarea-or-select': true
        },
        output: 0
    }
];
