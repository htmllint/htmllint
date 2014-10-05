var elems = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
];

/**
 * Returns whether or not an html tag name is a void element.
 * @param {String} tagName - a name of a html tag
 * @returns {Boolean} whether or not `tagName` is a void element
 */
module.exports.isVoidElement = function (tagName) {
    return elems.indexOf(tagName) !== -1;
};
