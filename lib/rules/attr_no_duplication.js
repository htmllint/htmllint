module.exports = {
    name: 'attr-no-duplication',
    description: 'Checks that an element does not define an attribute more than once.'
};

module.exports.process = function (element, opts) {
    // if this rule is not enabled, get outta here!
    if (!opts[this.name] || !element.dupes) {
        return [];
    }
 
    var length = element.dupes.length,
        issues = [];
    for (var index = 0; index < length; index++) {
        issues.push({
           index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: 'duplicate attribute ' + element.dupes[index] + ' exists' 
        });
    }
    return issues;
};