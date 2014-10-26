module.exports = {
    name: 'doctype-html5',
    description: 'The doctype must conform to the HTML5 standard.'
};

module.exports.process = function (ele, opts) {
    if (!opts[this.name] || ele.type !== 'directive') {
        return [];
    }

    //this does not support legacy strings or obsolete permitted doctypes
    //because we assume if you're working in node.js, your toolchain
    //does not necessitate these features.

    var doctype = /^!DOCTYPE[ \t\n\f]+html[ \t\n\f]*$/i;
    var name = /!doctype/i;
    if (name.test(ele.name)) {
        if (ele.data && doctype.test(ele.data)) {
            return [];
        } else {
            return {
                index: ele.index,
                line: ele.lineCol[0],
                column: ele.lineCol[1],
                msg: 'The doctype must conform to the HTML5 standard.'
            };
        }
    } else {
        return [];
    }
};
