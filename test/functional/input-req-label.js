module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<input type="text" >',
        opts: {'input-text-req-label': false },
        output: 0
    },
    {
        desc: 'should do nothing with just a label',
        input: '<label>Just a label</label>',
        opts: {'input-text-req-label': true },
        output: 0
    },
    {
        desc: 'should do nothing with a label with a "for" attrib',
        input: '<label for="doesntmatter">Just a label</label>',
        opts: {'input-text-req-label': true },
        output: 0
    },
    {
        desc: 'should do nothing with just a label',
        input: '<label>Just a label</label>',
        opts: {'input-text-req-label': true },
        output: 0
    },
    {
        desc: 'should do nothing with just an input',
        input: '<input >',
        opts: {'input-text-req-label': true },
        output: 0
    },
    {
        desc: 'should do nothing with an input of the wrong type',
        input: '<input type="number" >',
        opts: {'input-text-req-label': true },
        output: 0
    },
    {
        desc: 'should return an error if the input has no label parent and no id/name',
        input: '<input type="text" value="great" >',
        opts: {'input-text-req-label': true },
        output: 1
    },
    {
        desc: 'should pass if it has a label parent anywhere up the DOM',
        input: '<div><label><p><div><input type="text" value="great" ></div></p></label></div>',
        opts: {'input-text-req-label': true },
        output: 0
    },
    {
        desc: 'should fail if the input has a name not matching the label for',
        input: '<div><label for="dinosaur">Label!</label></div><section><input type="text" name="romeo"></section> ',
        opts: {'input-text-req-label': true },
        output: 1
    },
    {
        desc: 'should pass if the input has a name matching the label for',
        input: '<div><label for="dinosaur">Label!</label></div><section><input type="text" name="dinosaur"></section> ',
        opts: {'input-text-req-label': true },
        output: 0
    },
    {
        desc: 'should fail if the input has a name not matching the label for',
        input: '<div><label for="dinosaur">Label!</label></div><section><input type="text" id="romeo"></section> ',
        opts: {'input-text-req-label': true },
        output: 1
    },
    {
        desc: 'should pass if the input has a name matching the label for',
        input: '<div><label for="dinosaur">Label!</label></div><section><input type="text" id="dinosaur"></section> ',
        opts: {'input-text-req-label': true },
        output: 0
    },
];