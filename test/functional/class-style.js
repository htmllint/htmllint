module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<div id="2fOwj_0o-3" class="0r9jfFJ2"></div>',
        opts: { 'class-style': false },
        output: 0
    }, {
        desc: 'should pass correctly styled class',
        input: '<div class="fowj0wo3"></div>',
        opts: { 'class-style': 'lowercase' },
        output: 0
    }, {
        desc: 'should fail incorrectly styled class names',
        input: '<div class="fojf*ovo"></div>',
        opts: { 'class-style': 'lowercase' },
        output: 1
    }, {
        desc: 'should accept a "dash" option',
        input: '<div class="fowj-awo3-fqowj"></div>',
        opts: { 'class-style': 'dash' },
        output: 0
    }, {
        desc: 'should accept a class that specifies multiple names',
        input: '<div class="pls no"></div>',
        opts: {'class-style': 'lowercase'},
        output: 0
    }, {
        desc: 'should accept classes that use the BEM format',
        input: '<div class="pls-no"></div><div class="pls-no__yes"></div><div class="pls-no__yes--no"></div><div class="pls-no__yes-no--maybe"></div>',
        opts: {'class-style': 'bem'},
        output: 0
    }, {
        desc: 'should accept a custom format RegExp',
        input: '<div class="pAsS-one"></div><div class="fail"></div><div class="pAsS-two">',
        opts: {'class-style': /^([a-z][A-Z])+(-[a-z]*)*$/},
        output: 1
    }, {
        desc: 'should make an appropriate string into a RegExp',
        input: '<div class="pAsS-one"></div><div class="fail"></div><div class="pAsS-two">',
        opts: {'class-style': '/^([a-z][A-Z])+(-[a-z]*)*$/'},
        output: 1
    }, {
        desc: 'should ignore classes matching ignore regex',
        input: '<div class="pls {{no0 oO&}}"></div>',
        opts: {'class-style': 'lowercase', 'id-class-ignore-regex': '{{.*?}}'},
        output: 0
    }, {
        desc: 'should fail classes not matching ignore regex',
        input: '<div class="pls {{no0 oO&}} fe<doracoin"></div>',
        opts: {'class-style': 'lowercase', 'id-class-ignore-regex': '{{.*?}}'},
        output: 1
    }, {
        desc: 'should give an error if id-class-ignore-regex is empty',
        input: '',
        opts: { 'class-style': 'lowercase', 'id-class-ignore-regex': '' },
        output: 1
    }, {
        desc: 'should use id-class-style option if class-style is false',
        input: '<div class="fojf*ovo"></div>',
        opts: { 'class-style': false, 'id-class-style': 'lowercase' },
        output: 1
    }, {
        desc: 'should not use id-class-style option if class-style is "none"',
        input: '<div class="fojf*ovo"></div>',
        opts: { 'class-style': 'none', 'id-class-style': 'lowercase' },
        output: 0
    }
]
