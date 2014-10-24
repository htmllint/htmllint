module.exports = {
    name: 'id-no-dup',
    description: 'If set, id values may not be duplicated across elements.',
    table: {}
};

module.exports.end = function () {
    // wipe previous table
    this.table = {};
};

module.exports.process = function (element, opts) {
    var enabled = opts[this.name],
        id = null;

    if (!enabled) {
        // only process this rule if enabled is truey
        return [];
    }

    // don't process the element if it isn't a tag or
    // doesn't have an id
    if (element.type !== 'tag' || !element.attribs.hasOwnProperty('id')) {
        return [];
    }

    id = element.attribs.id.value;

    // if we haven't seen the id before, remember it
    // and pass the element
    if (!this.table.hasOwnProperty(id)) {
        this.table[id] = element;
        return [];
    }

    // element has a duplicate id
    var a = element.attribs.id;
    return {
        index: a.valueIndex,
        line: a.valueLineCol[0],
        column: a.valueLineCol[1],
        msg: 'the id "' + id + '" is already in use'
    };
};
