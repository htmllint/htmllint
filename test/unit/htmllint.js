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
        var fs = require('fs'),
            filePath = './test/fixtures/sanity.html';
        var sanityHtml = fs.readFileSync(filePath, {encoding: 'utf8'});

        expect(function () {
            htmllint(sanityHtml);
        }).to.not.throw(Error);
    });
});
