module.exports = {
    name: 'inline_style',
    description: 'forbids inline styles in html'
};

module.exports.process = function (html, opts) {
    var issues = [],
        reg = /<style>|style=/g,
        match = reg.exec(html);

    while (match) {
        issues.push({
            line: 0,
            index: match.index,
            msg: 'do not use inline styles'
        });

        match = reg.exec(html);
    }

    return issues;
};
