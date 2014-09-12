var expect = require('chai').expect;

describe('rules.id_class_value', function () {
    var rule = require('../lib/rules/id_class_value'),
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
            var output = rule.process([], {});

            expect(output).to.be.an.instanceOf(Array);
        });

        it('should pass correctly styled id and class', function () {
            var dom = parser.parse('<div id="abc" class="fowj0wo3"></div>'),
                output = rule.process(dom, {'id-class-value': rule.default});

            expect(output).to.have.length(0);
        });

        it('should fail incorrectly styled id names', function () {
            var dom = parser.parse('<div id="foWj0wo3"></div>'),
                output = rule.process(dom, {'id-class-value': rule.default});

            expect(output).to.have.length(1);
        });

        it('should fail incorrectly styled class names', function () {
            var dom = parser.parse('<div class="fojf*ovo"></div>'),
                output = rule.process(dom, {'id-class-value': rule.default});

            expect(output).to.have.length(1);
        });

        it('should accept "dash" option', function () {
            var dom = parser.parse('<div id="abc" class="fowj-awo3-fqowj"></div>'),
                output = rule.process(dom, {'id-class-value': 'dash'});

            expect(output).to.have.length(0);
        });
    });
});
