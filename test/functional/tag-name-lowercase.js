module.exports = [
    {
        desc: 'should match attributes with mixed case',
        input: '<boDY>',
        output: 1
    },
    {
        desc: 'should not match attributes with lowered case',
        input: '<body>',
        output: 0
    },
    {
        desc: 'should multiple mixed-case elements',
        input: '<HTML><seCtion></section></HTML>',
        output: 2
    }
];
