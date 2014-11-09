module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<div id="2fOwj_0o-3" class="0r9jfFJ2"></div>',
        opts: { 'id-class-style': false },
        output: 0
    }, {
        desc: 'should pass correctly styled id and class',
        input: '<div id="abc" class="fowj0wo3"></div>',
        opts: { 'id-class-style': 'lowercase' },
        output: 0
    }, {
        desc: 'should fail incorrectly styled id names',
        input: '<div id="foWj0wo3"></div>',
        opts: { 'id-class-style': 'lowercase' },
        output: 1
    }, {
        desc: 'should fail incorrectly styled class names',
        input: '<div class="fojf*ovo"></div>',
        opts: { 'id-class-style': 'lowercase' },
        output: 1
    }, {
        desc: 'should accept a "dash" option',
        input: '<div id="abc" class="fowj-awo3-fqowj"></div>',
        opts: { 'id-class-style': 'dash' },
        output: 0
    }, {
        desc: 'should accept a class or id property that specifies multiple names',
        input: '<div id="dogecoin litecoin fedoracoin" class="pls no"></div>',
        opts: {'id-class-style': 'lowercase'},
        output: 0
    }
];
