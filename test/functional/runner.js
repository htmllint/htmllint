var fs = require('fs'),
    path = require('path'),
    Linter = require('../../lib/linter');

// find all files in this directory that are .js files
var testFiles = fs.readdirSync(__dirname)
    .filter(function (filepath) {
        return (path.extname(filepath) === '.js' &&
                path.basename(filepath) !== 'runner.js');
    })
    .map(function (filepath) {
        var basename = path.basename(filepath, '.js');

        return {
            name: basename,
            mod: require(path.join('.', basename))
        };
    });

function doTest(funcTest, rule) {
    it(funcTest.desc, function () {
        var linter = new Linter();
        linter.addRule(rule);

        var output = linter.lint(funcTest.input);
        funcTest.output.forEach(function (expectedIssue, i) {
            Object.keys(expectedIssue).forEach(function (key) {
                expect(output[i][key]).to.be.equal(expectedIssue[key]);
            });
        });
        expect(output).to.have.length(funcTest.output.length);
    });
}

testFiles.forEach(function (testFile) {
    describe(testFile.name, function () {
        testFile.mod.forEach(doTest);
    });
});
