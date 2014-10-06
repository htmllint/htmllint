module.exports = [
    {
        desc: 'should match unquoted attr',
        input: '<button disabled></button>',
        opts: { 'attr-value-quotes': 'quoted' },
        output: 1
    }, {
        desc: 'should match single quoted attr in double mode',
        input: "<button disabled=''></button",
        opts: { 'attr-value-quotes': 'double' },
        output: 1
    }, {
        desc: 'should match double quoted attr in single mode',
        input: '<button disabled="not"></button>',
        opts: { 'attr-value-quotes': 'single' },
        output: 1
    }, {
        desc: 'should not run when disabled',
        input: '<button disabled></button>',
        opts: { 'attr-value-quotes': false },
        output: 0
    }, {
        desc: 'should pass quoted attr',
        input: '<button t="0" t=\'k\'></button>',
        opts: { 'attr-value-quotes': 'quoted' },
        output: 0
    }
];
