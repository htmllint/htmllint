module.exports = {
    name: 'id-class-no-ad',
    description: 'If set, ids and classes may not use the word "ad".'
};

module.exports.process = function (element, opts) {
    var enabled = opts[this.name];
    if (!enabled || element.type !== 'tag') {
        return [];
    }

    function test(s) {
        return /(^|[^a-zA-Z0-9])ad([^a-zA-Z0-9]|$)/.test(s);
    }
    var a = element.attribs;
    if ('id' in a && test(a.id.value) || 'class' in a && test(a.class.value)) {
        return {
            index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: 'ids and classes may not use the word "ad"'
        };
    }
};
