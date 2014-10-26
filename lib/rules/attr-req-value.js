module.exports = {
    name: 'attr-req-value',
    description: 'If set, attribute values cannot be empty.',
    on: ['tag']
};

module.exports.lint = function (ele, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var issues = [];
    for (var property in ele.attribs) {
        if (ele.attribs[property] && ele.attribs[property].value === '') {
            var validateRaw = /^[a-zA-Z]+([ ]+[^ ]+[ ]*=[ ]*[^ ]+)*$/;
            if (!validateRaw.test(ele.open)) {
                issues.push({
                    index: ele.index,
                    line: ele.openLineCol[0],
                    column: ele.openLineCol[1],
                    msg: 'Attribute values cannot be empty.'
                });
            }
        }
    }
    return issues;
};
