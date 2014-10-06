module.exports = {
    name: 'img-src-not-empty',
    description: 'If set, a source must be given for each `img` tag.'
};

module.exports.process = function(element, opts) {
    var enabled = opts['img-src-not-empty'];
    if (!enabled || element.type !== 'tag') {
        return [];
    }

    if (element.name === 'img' && !element.attribs.src) {
        return {
            index: element.index,
            line: element.openLineCol[0],
            column: element.openLineCol[1],
            msg: 'a source must be given for each `img` tag'
        };
    }
};
