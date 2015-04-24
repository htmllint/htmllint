module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<HTML><seCtion></section></HtML>',
        opts: { 'tag-name-match': false },
        output: 0
    }, {
        desc: 'should pass for matching tags',
        input: '<boDY></boDY>',
        opts: { 'tag-name-match': true },
        output: 0
    }, {
        desc: 'should fail for non-matching tags',
        input: '<boDY></bODy>',
        opts: { 'tag-name-match': true },
        output: 1
    }, {
        desc: 'should fail for each non-matching set',
        input: '<HTML><section></seCtion></html>',
        opts: { 'tag-name-match': true },
        output: 2
    }, {
        desc: 'should not fail for self-closing tags',
        input: '<html><br/></html>',
        opts: { 'tag-name-match': true },
        output: 0
    }
];
