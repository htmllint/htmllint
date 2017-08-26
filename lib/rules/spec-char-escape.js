var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'spec-char-escape',
    on: ['dom'],
    filter: ['text', 'tag'],
    desc: 'If set, special characters in text and attributes (e.g. `>`) must be escaped.'
};

// Messages for each group in the regex
var messages = [
    undefined,
    'an escape with invalid characters',
    'an unescaped angle bracket',
    'an ill-formed escape sequence'
];
var regex = /(&[^a-zA-Z0-9#;]*;)|([<>])|(&[a-zA-Z0-9#]*[^a-zA-Z0-9#;])/gm;

function addIssues(text, lineCol, issues, partDesc) {
    var lineColFunc = knife.getLineColFunc(text, lineCol),
        match;
    while (match = regex.exec(text)) {
        var i = 1; while (!match[i]) { i++; }
        issues.push(new Issue('E023', lineColFunc(match.index), {
            chars: match[i],
            part: partDesc,
            desc: messages[i]
        }));
    }
}

module.exports.lint = function (element, opts) {
    var issues = [];

    // if it's text - make sure it only has alphanumericals. If it has a &, a ; should follow.
    if (element.type === 'text' && element.data.length > 0) {
        addIssues(element.data, element.lineCol, issues, 'text');
    }

    var attrs = element.attribs;
    if (attrs) {
        Object.keys(attrs).forEach(function (name) {
            var v = attrs[name];
            addIssues(v.value, v.valueLineCol, issues, 'attribute value');
        });
    }
    return issues;
};
