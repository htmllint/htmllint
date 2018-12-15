var lint = require('../../'),
    InlineConfig = require('../../lib/inline_config.js'),
    lodash = require('lodash');

var textSplit = [
    '<!DOCTYPE html>', // 15
    '<html>', // 6
    '\r', // 0
    '<head>', // 6
    '\t<meta charset="utf-8" />',
    '\t<title>Hello, World!</title>',
    '</head>',
    '\r',
    '<body>',
    '\t<h1 id="heading">Heading</h1>',
    '\t<p>Paragraph</p>',
    '\t<div id="heading">',
    '\t\t<div role="supra">This inside that</div>',
    '\t\t<div class="ad">This inside that</div>',
    '\t</div>',
    '</body>',
    '\r',
    '</html>'
];

function meetExpectations(output, expectation) {
    if (output.length !== expectation.length) {
        return false;
    }

    for (var i = 0; i < output.length; i++) {
        if (output[i].name !== expectation[i].name ||
            expectation[i].line && (output[i].line !== expectation[i].line)) {
            return false;
        }
    }

    return true;
}

function expectOutput(html, expected, trim) {
    return lint(html.join('\n') + '\n').then(function (output) {
        if (trim) { output = output.slice(0, expected.length); }
        expect(meetExpectations(output, expected)).to.be.true;
    });
}

function expectConfigIssue(html, code) {
    return expectOutput(html, [{code:code}], true);
}

describe('inline-configuration', function () {
    var original = null;
    var expdefault = [
        { code: 'E015', line: 3 },
        { code: 'E015', line: 8 },
        { code: 'E015', line: 17 },
        { code: 'E012' },
        { code: 'E010' }
    ];
    var expshift = [
        { code: 'E015', line: 3 },
        { code: 'E015', line: 9 },
        { code: 'E015', line: 18 },
        { code: 'E012' },
        { code: 'E010' }
    ];
    var expfalse = [0,3,4].map(
        function(i) { return expdefault[i]; }
    );

    beforeEach(function () {
        original = lodash.cloneDeep(textSplit);
    });

    // Tests for inlineConfig internals
    // Should instantiate an object rather than using the prototype
    it('should throw when indices are passed to getOptsAtInex out of order', function () {
        expect(InlineConfig.prototype.getOptsAtIndex.bind(this,-10))
            .to.throw();
    });
    it('should throw when a config is added twice', function () {
        var c = new InlineConfig({setOption: function(o) {return o;}});
        c.addConfig({end: 5});
        expect(c.addConfig.bind(c,{end: 5})).to.throw();
    });

    it('should not do anything if no inline config comments exist', function () {
        return expectOutput(original, expdefault);
    });

    it('should not do anything on an empty tag', function () {
        original.splice(3, 0, '<!-- htmllint -->');
        return expectOutput(original, expshift);
    });

    it('should change options to turn off rules', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style="false" -->');
        return expectOutput(original, expfalse);
    });

    it('should accept $preset notation', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style="$none" -->');
        return expectOutput(original, expfalse);
    });

    it('should work when used multiple times in a line', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style="cr" -->'
                            + '<!-- htmllint line-end-style="false" -->');
        return expectOutput(original, expfalse);
    });

    it('should use allow $previous to revert value', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style="false" -->'
                            + '<!-- htmllint line-end-style="$previous" -->');
        return expectOutput(original, expshift);
    });

    it('should output an issue on invalid $preset', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style="$invalid" -->');
        return expectConfigIssue(original, 'E051');
    });

    it('should work without quotes', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style=false -->');
        return expectOutput(original, expfalse);
    });

    it('should work for strings without quotes', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style=lf -->');
        return expectOutput(original, expshift);
    });

    it('should output an issue on bad config formatting', function () {
        original.splice(4, 0, '<!-- htmllint line-end-style="false" id-no-dup-"false" id-class-no-ad="false" -->');
        return expectConfigIssue(original, 'E050');
    });

    it('should throw an error on bad options', function () {
        original.splice(4, 0, '<!-- htmllint line-end-style="false" id-no-dup="false" id-no-no-ad="false" -->');
        return expectConfigIssue(original, 'E054');
    });

    it('should output an issue on invalid option value', function () {
        original.splice(4, 0, '<!-- htmllint line-end-style="fal#se" -->');
        return expectConfigIssue(original, 'E053');
    });

    it('should throw on nonexistent rule name', function () {
        original.splice(4, 0, '<!-- htmllint not-rule="false" -->');
        return expectConfigIssue(original, 'E054');
    });

    it('should output an issue on invalid rule name', function () {
        original.splice(3, 0, '<!-- htmllint pre#set="none" -->');
        return expectConfigIssue(original, 'E051');
    });

    it('should change multiple rules', function () {
        original.splice(4, 0, '<!-- htmllint line-end-style="false" id-no-dup="false" id-class-no-ad="false" -->');
        return expectOutput(original, [{ code: 'E015', line: 3 }]);
    });

    it('should take in presets', function () {
        original.splice(1, 0, '<!-- htmllint preset="none" -->');
        return expectOutput(original, []);
    });

    it('should restore values with $previous after using presets', function () {
        original.splice(3, 0, '<!-- htmllint preset="none" -->'
                            + '<!-- htmllint line-end-style="$previous" -->');
        return expectOutput(original, expfalse);
    });

    it('should revert last setting preset=$previous', function () {
        original.splice(3, 0, '<!-- htmllint line-end-style="false" -->'
                            + '<!-- htmllint id-no-dup="false" id-class-no-ad="false" -->'
                            + '<!-- htmllint preset="$previous" -->');
        return expectOutput(original, expfalse);
    });

    it('should revert an entire preset with preset=$previous', function () {
        original.splice(3, 0, '<!-- htmllint preset="none" -->'
                            + '<!-- htmllint preset="$previous" -->');
        return expectOutput(original, expshift);
    });

    it('should output an issue on invalid preset option', function () {
        original.splice(3, 0, '<!-- htmllint preset="invalid" -->');
        return expectConfigIssue(original, 'E052');
    });
});
