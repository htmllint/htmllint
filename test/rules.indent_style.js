describe('rules.indent_style', function () {
    var rule = require('../lib/rules/indent_style'),
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

    it('should have a default of "nonmixed"', function () {
        expect(rule.default).to.be.eql('nonmixed');
    });

    describe('scan', function () {
        var Parser = require('../lib/parser'),
            parser = null;

        beforeEach(function () {
            parser = new Parser();
        });

        it('should return an array', function () {
            var output = rule.scan([]);
            expect(output).to.be.an.instanceOf(Array);
        });


        ////////// WORK HERE TODO

        it('should return an array', function () {
            var output = rule.scan([]);
            expect(output).to.be.an.instanceOf(Array);
        });
    });
});
