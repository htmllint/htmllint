module.exports = [
    {
        desc: 'should not match images with fallbacks',
        input: '<img src="suchcode.jpg" alt="wow">',
        opts: { 'img-req-alt': true },
        output: 0
    }, {
        desc: 'should match images without fallbacks',
        input: '<img src="nyannynyan.svg">',
        opts: { 'img-req-alt': true },
        output: 1
    }, {
        desc: 'should not match non image elements without fallbacks',
        input: '<div>this should return 0</div>',
        opts: { 'img-req-alt': true },
        output: 0
    }, {
        desc: 'should not match when disabled',
        input: '<img src="nyannynyan.svg">',
        opts: { 'img-req-alt': false },
        output: 0
    }
];
