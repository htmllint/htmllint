module.exports = {
    name: 'id-class-no-ad',
    on: ['attr'],
    filter: ['id', 'class']
};

module.exports.lint = function (attr, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var match = /(^|[^a-zA-Z0-9])ad([^a-zA-Z0-9]|$)/.exec(attr.value);
    if (!match) {
        return [];
    }
    var ind = match.index + (attr.value[match.index] !== 'a');
    return {
        name: this.name,
        index: attr.valueIndex + ind,
        line: attr.valueLineCol[0],
        column: attr.valueLineCol[1] + ind,
        msg: 'ids and classes may not use the word "ad"'
    };
};