module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<div abc="" 2fOwj_0o-3="" 0r9jfFJ2=""></div>',
        opts: { 'attr-name-style': false },
        output: 0
    }, {
        desc: 'should pass correctly styled attribute names',
        input: '<div abc="" fowj0wo3=""></div>',
        opts: { 'attr-name-style': 'lowercase' },
        output: 0
    }, {
        desc: 'should fail incorrectly styled attribute names',
        input: '<div foWj0wo3=""></div>',
        opts: { 'attr-name-style': 'lowercase' },
        output: 1
    }, {
        desc: 'should accept "dash" option',
        input: '<div abc="" fowj-awo3-fqowj=""></div>',
        opts: { 'attr-name-style': 'dash' },
        output: 0
    }
];
