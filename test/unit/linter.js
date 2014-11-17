var knife = require('../../lib/knife');

describe('linter', function () {
    var Linter = require('../../lib/linter');
    var linter = null;

    it('should be a function', function () {
        expect(Linter).to.be.an.instanceOf(Function);
    });

    beforeEach(function () {
        linter = new Linter();
    });

    describe('lint', function () {
        var ConstRule = require('../fixtures/const_rule');

        xit('should return correct line and column numbers', function () {
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

        xit('should not return more than the maxerr', function () {
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

    describe('resetRules', function () {
        it('should return an array of issues', function () {
            var issue = { msg: 'hit' };

            linter.rules.addRule({
                end: function () { return issue; }
            });

            var output = linter.resetRules();

            expect(output[0]).to.be.eql(issue);
        });
    });

    // TODO: move these out of this file...
    describe('shred', function () {
        it('should return an array', function () {
            var output = knife.shred('');
            expect(output).to.be.an.instanceOf(Array);
        });

        it('should return the proper number of lines', function () {
            var lines = [
                'Line1Line1Line1Line1',
                'Line2Line2Line2Line2',
                'Line3Line3Line3Line3'
            ];
            var output = knife.shred(lines.join('\n').concat('\n'));

            expect(output.length - 1).to.be.eql(lines.length);
        });

        it('should return the full line at the right index', function () {
            var lines = [
                'Line1Line1Line1Line1',
                'Line2Line2Line2Line2',
                'Line3Line3Line3Line3'
            ];
            var concatted = lines.join('\n').concat('\n');
            var output = knife.shred(concatted);

            expect(output[lines.length].line).to.be.eql(lines[lines.length - 1].concat('\n'));
            expect(output[lines.length].index).to.be.eql(concatted.indexOf(lines[lines.length - 1].concat('\n')));
        });
    });

});
