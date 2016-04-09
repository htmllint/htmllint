module.exports = [
    {
        desc: 'should not match images with dimensions',
        input: '<img src="suchcode.jpg" width="1" height="1">',
        opts: { 'img-req-dimensions': true },
        output: 0
    }, {
        desc: 'should match images without dimensions',
        input: '<img src="nyannynyan.svg">',
        opts: { 'img-req-dimensions': true },
        output: 1
    }, {
        desc: 'should match images without width dimension',
        input: '<img src="nyannynyan.svg" height="1">',
        opts: { 'img-req-dimensions': true },
        output: 1
    }, {
        desc: 'should match images without height dimension',
        input: '<img src="nyannynyan.svg" width="1">',
        opts: { 'img-req-dimensions': true },
        output: 1
    }, {
        desc: 'should fail when img dimensions is empty',
        input: '<img src="nyannynyan.svg" width="" height="">',
        opts: { 'img-req-dimensions': true },
        output: 1
    }, {
        desc: 'should fail when img width dimensions is empty',
        input: '<img src="nyannynyan.svg" width="" height="1">',
        opts: { 'img-req-dimensions': true },
        output: 1
    }, {
        desc: 'should fail when img height dimensions is empty',
        input: '<img src="nyannynyan.svg" width="1" height="">',
        opts: { 'img-req-dimensions': true },
        output: 1
    }, {
        desc: 'should not match non image elements without dimensions',
        input: '<div>this should return 0</div>',
        opts: { 'img-req-dimensions': true },
        output: 0
    }, {
        desc: 'should not match when disabled',
        input: '<img src="nyannynyan.svg">',
        opts: { 'img-req-dimensions': false },
        output: 0
    }
];
