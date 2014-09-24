var domUtils = require('htmlparser2').DomUtils;

module.exports = {
    name: 'alt-require',
    trigger: 'img',
    description: [
        'If set, the `alt` property must be set for image tags'
    ].join('')
};

function filterElements(opts, ele) {
    if (ele.type !== 'tag' || ele.name !== 'img') {
        // filter out if the element is not an img tag
        return false;
    }

    // raise an issue if the alt attribute is not set
    return !ele.attribs.alt;
}

function createIssue(opts, ele) {
    return {
        index: ele.index,
        msg: 'the `alt` property must be set for image tags.'
    };
}

module.exports.process = function (dom, opts) {
    return domUtils
        .findAll(filterElements.bind(this, opts), dom)
        .map(createIssue.bind(this, opts));
};
