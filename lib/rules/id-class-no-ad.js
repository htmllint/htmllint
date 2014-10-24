module.exports = {
    name: 'id-class-no-ad',
    description: 'If set, ids and classes may not use the word "ad".'
};

module.exports.process = function (element, opts) {
    var enabled = opts[this.name];
    if (!enabled || element.type !== 'tag') {
        return [];
    }

    var as = element.attribs;
    var issues = [];
    ['id', 'class'].map(function(s) {
        if (!(s in as)) { return; }
        var a = as[s];
        var match = /(^|[^a-zA-Z0-9])ad([^a-zA-Z0-9]|$)/.exec(a.value);
        if (match) {
            var ind = match.index + (a.value[match.index] !== 'a');
            issues.push({
                index: a.valueIndex + ind,
                line: a.valueLineCol[0],
                column: a.valueLineCol[1] + ind,
                msg: 'ids and classes may not use the word "ad"'
            });
        }
    });
    return issues;
};
