describe('linter', function () {
    var Linter = require('../../lib/linter');

    it('should be a function', function () {
        expect(Linter).to.be.an.instanceOf(Function);
    });

    describe('addRule', function () {
        var linter = null;

        beforeEach(function () {
            linter = new Linter();
        });

        it('should add a named rule', function () {
            var rule = {
                name: '$$testrule'
            };

            linter.addRule(rule);

            expect(linter.rules).to.have.property(rule.name);
        });
    });

    describe('lint', function () {
        var ConstRule = require('../fixtures/const_rule');
        var linter = null;

        beforeEach(function () {
            linter = new Linter();
        });

        it('should return correct line and column numbers', function () {
            var rule = new ConstRule([{
                msg: 'this is a test',
                index: 4,
                line: 2,
                column: 3
            }]), output;

            linter.addRule(rule);
            output = linter.lint('f\nfff');

            expect(output[0].line).to.be.eql(2);
            expect(output[0].column).to.be.eql(3);
        });

        it('should not return more than the maxerr', function () {
            var rule = new ConstRule([{
                msg: 'this is a test',
                index: 4
            }, {
                msg: 'this is a test',
                index: 2
            }]), output;

            linter.addRule(rule);
            output = linter.lint('f\nfff', { maxerr: 1 });

            expect(output.length).to.be.eql(1);
        });
    });

    describe('shred', function () {
        var linter = new Linter();

        it('should return an array', function () {
            var output = linter.shred('');
            expect(output).to.be.an.instanceOf(Array);
        });

        it('should return the proper number of lines', function () {
            var lines = [
                'Line1Line1Line1Line1',
                'Line2Line2Line2Line2',
                'Line3Line3Line3Line3'
            ];
            var output = linter.shred(lines.join('\n').concat('\n'));

            expect(output.length - 1).to.be.eql(lines.length);
        });

        it('should return the full line at the right index', function () {
            var lines = [
                'Line1Line1Line1Line1',
                'Line2Line2Line2Line2',
                'Line3Line3Line3Line3'
            ];
            var concatted = lines.join('\n').concat('\n');
            var output = linter.shred(concatted);

            expect(output[lines.length].line).to.be.eql(lines[lines.length - 1].concat('\n'));
            expect(output[lines.length].index).to.be.eql(concatted.indexOf(lines[lines.length - 1].concat('\n')));
        });
    });

});
