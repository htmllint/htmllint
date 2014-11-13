var lodash = require('lodash');

var errors = {
    E000: 'not a valid error code',
    E001: 'the "<%= attribute %>" attribute is banned',
    E002: 'attribute names must match the format: <%= format %>',
    E003: 'duplicate attribute: <%= attribute %>',
    E004: 'attribute values must not include unsafe characters',
    E005: 'the "<%= attribute %>" attribute is not <%= format %>',
    E006: 'attribute values cannot be empty',
    E007: '<!DOCTYPE> should be the first element seen',
    E008: 'the doctype must conform to the HTML5 standard.',
    E009: 'use only <%= format %> links',
    E010: 'ids and classes may not use the word "ad"',
    E011: 'ids and classes must match the format: <%= format %>',
    E012: 'the id "<%= id %>" is already in use',
    E013: 'the `alt` property must be set for image tags.',
    E014: 'a source must be given for each `img` tag',
    E015: 'line ending does not match format: <%= format %>',
    E016: 'the <%= tag %> tag is banned',
    E017: 'tag names must be lowercase',
    E018: 'void element should close itself',
    E019: 'all labels should have a `for` attribute',
    E020: 'label does not have a "for" attribute or a labeable child',
    E021: 'an element with the id "<%= id %>" does not exist (should match "for" attribute)',
    E022: 'the linked element is not labeable (id: <%= id %>)',
    E023: '<%= part %> contains improperly escaped characters: <%= chars %>',
    E024: '<%= raw %>', // TODO: this rule man
    E025: 'html element should specify the language of the page'
};

module.exports.errors = {};

lodash.forOwn(errors, function (format, code) {
    module.exports.errors[code] = {
        format: format,
        code: code
    };
});

module.exports.renderMsg = function (code, data) {
    var format = errors[code];

    return lodash.template(format, data);
};

module.exports.renderIssue = function (issue) {
    return this.renderMsg(issue.code, issue.data);
};
