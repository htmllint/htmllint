var lint = require('../../'),
    fs = require('fs'),
    lodash = require('lodash');

var files = {
    all: fs.readFileSync('./test/unit/inline-config-html/inline-all.html', {
        encoding: 'utf8'
    }),
}

var textSplit = [
    '<!DOCTYPE html>', // 15
    '<html>', // 6
    '', // 0
    '<head>', // 6
    '\t<meta charset="utf-8" />',
    '\t<title>Hello, World!</title>',
    '</head>',
    '',
    '<body>',
    '\t<h1 id="heading">Heading</h1>',
    '\t<p>Paragraph</p>',
    '\t<div id="heading">',
    '\t\t<div role="supra">This inside that</div>',
    '\t\t<div class="ad">This inside that</div>',
    '\t</div>',
    '</body>',
    '',
    '</html>'
];

function meetExpectations(output, expectation) {
    if (output.length != expectation.length) {
        return false;
    }
    for (var i = 0; i < output.length; i++) {
        if (output[i].name !== expectation[i].name)
            return false;
        if (expectation[i].line && (output[i].line !== expectation[i].line))
            return false;
    }
    return true;
}

describe('inline-configuration', function () {
    var output = null,
        original = null;

    beforeEach(function () {
        original = lodash.cloneDeep(textSplit);
    })

    it('should not do anything if no inline config comments exist', function () {
        output = lint(original.join('\n') + '\n');

        var expectation = [
            {
                name: 'line-end-style',
                line: 3
            },
            {
                name: 'line-end-style',
                line: 8
            },
            {
                name: 'line-end-style',
                line: 17
            },
            {
                name: 'id-no-dup'
            },
            {
                name: 'id-class-no-ad'
            }
        ];
        var result = meetExpectations(output, expectation);

        if (!result) console.log(output);
        expect(result).to.be.eql(true);
    });

    it('should change rules to turn them off', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style="false" -->');
        output = lint(original.join('\n') + '\n');

        var expectation = [
            {
                name: 'line-end-style',
                line: 3
            },
            {
                name: 'id-no-dup'
            },
            {
                name: 'id-class-no-ad'
            }
        ];
        var result = meetExpectations(output, expectation);

        if (!result) console.log(output);
        expect(result).to.be.eql(true);
    });

    it('should throw an error on bad config formatting', function () {
        original.splice(4, 0, '<!-- htmllint line-end-style="false" id-no-dup-"false" id-class-no-ad="false" -->');
        expect(function () {lint(original.join('\n') + '\n')}).to.throw(Error);
    });
    
    it('should throw an error on bad options', function () {
        original.splice(4, 0, '<!-- htmllint line-end-style="false" id-no-dup-"false" id-no-no-ad="false" -->');
        expect(function () {lint(original.join('\n') + '\n')}).to.throw(Error);
    });

    it('should change multiple rules', function () {
        original.splice(4, 0, '<!-- htmllint line-end-style="false" id-no-dup="false" id-class-no-ad="false" -->');
        output = lint(original.join('\n') + '\n');

        var expectation = [
            {
                name: 'line-end-style',
                line: 3
            }
        ];
        var result = meetExpectations(output, expectation);

        if (!result) console.log(output);
        expect(result).to.be.eql(true);
    });
    
    it('should take in presets', function () {
        original.splice(1, 0, '<!-- htmllint preset="$none" -->');
        console.log(original);
        console.log(original.join('\n') + '\n')
        output = lint(original.join('\n') + '\n');

        var expectation = [];
        var result = meetExpectations(output, expectation);

        if (!result) console.log(output);
        expect(result).to.be.eql(true);
    });
});