module.exports = [
    {
        desc: 'should not match images with fallbacks',
        input: '<img src="suchcode.jpg" alt="wow">',
        output: 0
    }, {
        desc: 'should match images without fallbacks',
        input: '<img src="nyannynyan.svg">',
        output: 1
    }, {
        desc: 'should not match non image elements without fallbacks',
        input: '<div>this should return 0</div>',
        output: 0
    }
];
