module.exports = [
    {
        desc: 'should not match tags with number of attributes less or equal then provided to rule',
        input: '<div class="role"></div>',
        opts: { 'attr-new-line': 1 },
        output: 0
    },
    {
        desc: 'should match tags with number of attributes more then provided to rule',
        input: '<div class="role" id="red"></div>',
        opts: { 'attr-new-line': 1 },
        output: 1
    },
    {
        desc: 'should not match tags with attributes splitted on multiple lines',
        input: '<div class="role"\n    id="red"></div>',
        opts: { 'attr-new-line': 1 },
        output: 0
    },
    {
        desc: 'should match tags with attributes splitted on multiple lines if first row has attributes more then provided in rule',
        input: '<div class="role"\n    id="red"></div>',
        opts: { 'attr-new-line': 0 },
        output: 1
    },
    {
        desc: 'should not match tags with attributes splitted on multiple lines if first row has attributes less or equal then provided in rule',
        input: '<div\nclass="role"\nid="red">\n</div>',
        opts: { 'attr-new-line': 0 },
        output: 0
    },
    {
        desc: 'should not match tags with attributes splitted on multiple lines if first row has attributes less or equal then provided in rule',
        input: '<div class="role"\n    id="red"></div>',
        opts: { 'attr-new-line': 1 },
        output: 0
    }
];
