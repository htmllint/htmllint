var expect = require('chai').expect;

describe('rules.disallowed_tags', function () {
    var rule = require('../lib/rules/disallowed_tags'),
        htmllint = require('../');

    it('should be an object', function () {
        expect(rule).to.be.an.instanceOf(Object);
    });

    it('should have a name', function () {
        expect(rule).to.have.property('name');
    });

    it('should have a description', function () {
        expect(rule).to.have.property('description');
    });

    it('should be registered', function () {
        expect(htmllint.defaultLinter.rules).to.have.property(rule.name);
    });

    describe('process', function () {
        var Parser = require('../lib/parser'),
            parser = null;

        beforeEach(function () {
            parser = new Parser();
        });

        it('should return an array', function () {
            var output = rule.process([]);

            expect(output).to.be.an.instanceOf(Array);
        });

        it('should not match div by default', function () {
            var dom = parser.parse('<body><div><p>This is text yo</p></div></body>'),
                output = rule.process(dom);

            expect(output).to.have.length(0);
        });

        it('should match style by default', function () {
            var dom = parser.parse('<body><div><style>p {color: red;}</style></div></body>'),
                output = rule.process(dom);

            expect(output).to.have.length(1);
        });

        it('should match multiple unwanted default-specified elements', function () {
            var dom = parser.parse('<body><div><style>p {color: red;}</style><i>italics</i><b></b></div></body>'),
                output = rule.process(dom);

            expect(output).to.have.length(3);
        });

        it('should match options if user sets them', function () {
            var dom = parser.parse('<body><button style=""></button><main></main></body>'),
                output = rule.process(dom, {'disallowed-tags': ['button', 'main']});

            expect(output).to.have.length(2);
        });

        it('should not match defaults if user sets new elements in options', function () {
            var dom = parser.parse('<body><style></style><i></i></body>'),
                output = rule.process(dom, {'disallowed-tags': ['button', 'main']});

            expect(output).to.have.length(0);
        });
    });
});
