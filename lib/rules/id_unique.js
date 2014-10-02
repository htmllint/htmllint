module.exports = {
    name: 'id-unique',
    description: [

    ].join(''),
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
    if (element.type !== 'tag' ||
        !element.attribs.hasOwnProperty('id')) {
        return [];
    }

    id = element.attribs.id;

    // if we haven't seen the id before, remember it
    // and pass the element
    if (!this.table.hasOwnProperty(id)) {
        this.table[id] = element;
        return [];
    }

    // element has a duplicate id
    return {
        index: element.index,
        msg: 'the id "' + id + '" is already in use'
    };
};
