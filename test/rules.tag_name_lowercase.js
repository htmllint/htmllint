describe('rules.tag_name_lowercase', function () {
    var rule = require('../lib/rules/tag_name_lowercase'),
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

        it('should match attributes with mixed case', function () {
            var dom = parser.parse('<boDY>'),
                output = rule.process(dom);

            expect(output).to.have.length(1);
        });
    });
});
