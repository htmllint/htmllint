var Issue = require('../issue');

module.exports = {
    name: 'attr-req-value',
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
                issues.push(new Issue('E006', ele.openLineCol));
            }
        }
    }
    return issues;
};
