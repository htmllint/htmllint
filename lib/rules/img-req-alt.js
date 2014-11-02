module.exports = {
    name: 'img-req-alt',
    filter: ['img'],
    on: ['tag']
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name]) {
        return [];
    }

    var a = element.attribs;
    return (a && a.hasOwnProperty('alt') && a.alt !== '') ? [] : {
        name: this.name,
        index: element.index,
        line: element.openLineCol[0],
        column: element.openLineCol[1],
        msg: 'the `alt` property must be set for image tags.'
    };
};