module.exports = [
    {
        desc: 'should pass when set to false',
        input: [
            '<label for="noexist">',
            '<input type="text" id="thing"/>',
            '</label>'
        ].join(''),
        opts: { 'label-req-for': false },
        output: 0
    }, {
        desc: 'should pass valid for attr in strict mode',
        input: [
            '<label for="thing">The Thing</label>',
            '<input type="text" id="thing"/>'
        ].join(''),
        opts: { 'label-req-for': 'strict' },
        output: 0
    }, {
        desc: 'should fail label with only child in strict mode',
        input: [
            '<label>',
            '<input type="text" id="thing"/>',
            '</label>'
        ].join(''),
        opts: { 'label-req-for': 'strict' },
        output: 1
    }, {
        desc: 'should pass label with only child in nonstrict mode',
        input: [
            '<label>',
            '<input type="text" id="thing"/>',
            '</label>'
        ].join(''),
        opts: { 'label-req-for': true },
        output: 0
    }, {
        desc: 'should fail label with nonexistant for id',
        input: [
            '<label for="noexist">',
            '<input type="text" id="thing"/>',
            '</label>'
        ].join(''),
        opts: { 'label-req-for': true },
        output: 1
    }, {
        desc: 'should pass label for with child id',
        input: [
            '<label for="thing">',
            '<input type="text" id="thing"/>',
            '</label>'
        ].join(''),
        opts: { 'label-req-for': true },
        output: 0
    }, {
        desc: 'should fail an unlabeable child in nonstrict',
        input: [
            '<label>',
            '<p>not labeable</p>',
            '</label>'
        ].join(''),
        opts: { 'label-req-for': true },
        output: 1
    }, {
        desc: 'should fail an id that points to an unlabeable element',
        input: [
            '<btn></btn><div>',
            '<label for="para"></label>',
            '<div id="para"></div>',
            '</div>'
        ].join(''),
        opts: { 'label-req-for': true },
        output: 1
    }
];
