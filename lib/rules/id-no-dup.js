module.exports = {
    name: 'id-no-dup',
    table: {},
    on: ['tag']
};

module.exports.end = function () {
    // wipe previous table
    this.table = {};
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name]) {
        return [];
    }

    // don't process the element if it doesn't have an id
    if (!element.attribs.hasOwnProperty('id')) {
        return [];
    }

    var id = element.attribs.id.value;

    // if we haven't seen the id before, remember it
    // and pass the element
    if (!this.table.hasOwnProperty(id)) {
        this.table[id] = element;
        return [];
    }

    // element has a duplicate id
    var a = element.attribs.id;
    return {
        name: this.name,
        index: a.valueIndex,
        line: a.valueLineCol[0],
        column: a.valueLineCol[1],
        msg: 'the id "' + id + '" is already in use'
    };
};
