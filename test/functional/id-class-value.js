module.exports = [
    {
        desc: 'should pass correctly styled id and class',
        input: '<div id="abc" class="fowj0wo3"></div>',
        output: 0
    }, {
        desc: 'should fail incorrectly styled id names',
        input: '<div id="foWj0wo3"></div>',
        output: 1
    }, {
        desc: 'should fail incorrectly styled class names',
        input: '<div class="fojf*ovo"></div>',
        output: 1
    }, {
        desc: 'should accept a "dash" option',
        input: '<div id="abc" class="fowj-awo3-fqowj"></div>',
        opts: { 'id-class-value': 'dash' },
        output: 0
    }
];
