module.exports = [
    {
        desc: 'should not match images with fallbacks',
        input: '<img src="suchcode.jpg" alt="wow">',
        output: 0
    }, {
        desc: 'should match images without fallbacks',
        input: '<img src="nyannynyan.svg">',
        output: 1
    }
];
