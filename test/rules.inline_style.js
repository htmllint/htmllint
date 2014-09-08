var expect = require('chai').expect;

describe('rules.inline_style', function () {
    var inlineStyle = require('../lib/rules/inline_style'),
        htmllint = require('../');

    it('should be an object', function () {
        expect(inlineStyle).to.be.an.instanceOf(Object);
    });

    it('should have a name', function () {
        expect(inlineStyle).to.have.property('name');
    });

    it('should have a description', function () {
        expect(inlineStyle).to.have.property('description');
    });

    it('should be registered', function () {
        expect(htmllint.defaultLinter.rules).to.have.property(inlineStyle.name);
    });

    describe('process', function () {
        var Parser = require('../lib/parser'),
            parser = null;

        beforeEach(function () {
            parser = new Parser();
        });

        it('should return an array', function () {
            var output = inlineStyle.process('');

            expect(output).to.be.an.instanceOf(Array);
        });

        it('should not match style elements', function () {
            var dom = parser.parse('<body style="hell></style>'),
                output = inlineStyle.process(dom);

            expect(output).to.have.length(0);
        });

        it('should match style attributes', function () {
            var dom = parser.parse('<button style=""></button>'),
                output = inlineStyle.process(dom);

            expect(output).to.have.length(1);
        });
    });
});
