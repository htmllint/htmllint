module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<fieldset><div>fieldcontent</div></fieldset>',
        opts: {
            'fieldset-contains-legend': false
        },
        output: 0
    },
    {
        desc: 'should fail when set to true',
        input: '<fieldset><div>fieldcontent</div></fieldset>',
        opts: {
            'fieldset-contains-legend': true
        },
        output: 1
    },
    {
        desc: 'should pass when set to true and contains a legend',
        input: '<fieldset><legend>theLegend</legend><div>fieldcontent</div></fieldset>',
        opts: {
            'fieldset-contains-legend': true
        },
        output: 0
    }
];
