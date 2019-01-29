module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<button type="button"></button>',
        opts: {
            'wcag-rule-78': false
        },
        output: 0
    },
    {
        desc: 'should fail when set to true with no content',
        input: '<button type="button"></button>',
        opts: {
            'wcag-rule-78': true
        },
        output: 1
    },
    {
        desc: 'should pass when set to true with content text',
        input: '<button type="button">CLICK ME</button>',
        opts: {
            'wcag-rule-78': true
        },
        output: 0
    },
    {
        desc: 'should pass when set to true with space content',
        input: '<button type="button">   </button>',
        opts: {
            'wcag-rule-78': true
        },
        output: 0
    },
    {
        desc: 'should pass when set to true with node content',
        input: '<button type="button"> <i class="click"></i>   </button>',
        opts: {
            'wcag-rule-78': true
        },
        output: 0
    }
    
];
