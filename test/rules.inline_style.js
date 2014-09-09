describe('rules.inline_style', function () {
    var rule = require('../lib/rules/disable_inline_style'),
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

        it('should not match style elements', function () {
            var dom = parser.parse('<body style="hell></style>'),
                output = rule.process(dom);

            expect(output).to.have.length(0);
        });

        it('should match style attributes', function () {
            var dom = parser.parse('<button style=""></button>'),
                output = rule.process(dom);

            expect(output).to.have.length(1);
        });
    });
});
