module.exports = {
    name: 'attr-no-unsafe-char',
    description: 'If set, unsafe characters may not be used in attribute values.'
};

module.exports.process = function (element, opts) {
    var format = opts[this.name];
    if (!format || element.type !== 'tag') {
        return [];
    }

    var regUnsafe = /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;
    var test = function(s) { return regUnsafe.test(s); };
    var a = element.attribs;
    if (Object.keys(a).map(function(key) { return a[key].value; }).some(test)) {
        return {
            index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: 'attribute values must not include unsafe characters'
        };
    }
};
