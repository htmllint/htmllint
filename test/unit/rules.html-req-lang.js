describe('rules.html-req-lang', function () {
    var rule = require('../../lib/rules/html-req-lang'),
        Issue = require('../../lib/issue');

    describe('lint', function () {
        it('should return [] when turned off', function () {
            var output = rule.lint(null, { 'html-req-lang': false });

            expect(output).to.be.eql([]);
        });

        it('should return [] when a lang attr is present', function () {
            var element = { lang: 'en' },
                opts = { 'html-req-lang': true };

            var output = rule.lint(element, opts);

            expect(output).to.be.eql([]);
        });

        it('should return an issue when no lang attr is present', function () {
            var element = { openLineCol: [0, 0] },
                opts = { 'html-req-lang': true };

            var output = rule.lint(element, opts);

            expect(output).to.be.instanceOf(Issue);
        });
    });
});
