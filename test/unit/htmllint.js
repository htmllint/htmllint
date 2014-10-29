describe('htmllint', function () {
    var htmllint = require('../../');

    it('should be a function', function () {
        expect(htmllint).to.be.an.instanceOf(Function);
    });

    it('should return an array', function () {
        var result = htmllint('');

        expect(result).to.be.an.instanceOf(Array);
    });

    it('should not throw on sanity.html', function () {
        var fs = require('fs');
        var filePath = './test/fixtures/sanity.html',
            sanityHtml = fs.readFileSync(filePath, {encoding: 'utf8'});

        expect(function () {
            htmllint(sanityHtml);
        }).to.not.throw(Error);
    });

    describe('create', function () {
        it('should registe rule objects', function () {
            var rule = { name: 'therule' };

            var linter = htmllint.create([rule]);
            var addedRule = linter.rules.getRule(rule.name);

            expect(addedRule).to.be.equal(rule);
        });
    });
});
