module.exports = {
    name: 'disallowed-tags',
    description: [
        'The value of this option is a list of strings,',
        'each of which is a tag name. Tags with any of',
        'the given names are disallowed.'
    ].join('')
};

module.exports.process = function (element, opts) {
    var format = opts['disallowed-tags'];
    if (!format) {
        return [];
    }

    if (['tag', 'style'].indexOf(element.type) > -1 && format.indexOf(element.name) > -1) {
        return {
            index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: 'element [' + element.name + '] not allowed'
        };
    } else {
        return [];
    }
};
