// this regex can assume valid, parsable html from htmlparser2
// results in 3 possible capture groups:
// 1: leading spaces
// 2: the attribute name
// 3: (unused)
// 4: text between matches 2 and 3
// 5: attribute value, including the quotations if they exist
var attrRegex = /(\s*)([^ "'>=\^]+)((\s*=\s*)((?:"[^"]*")|(?:'[^']*')|(?:\S+)))?/g;

module.exports.parseHtmlAttrs = function (attrs) {
    var ret = [],
        match;

    while (match = attrRegex.exec(attrs)) {
        ret.push({
            name: match[2],
            valueRaw: match[5]
        });
    }

    return ret;
};

// Find the indices for attribute names and values.
// If an attribute is duplicated, use the first instance that has a value,
// or the first instance if there is no value.
module.exports.inputIndices = function (attributes, openTag, openIndex) {
    var match;
    while (match = attrRegex.exec(openTag)) {
        var name = match[2].trim();
        if (name && attributes.hasOwnProperty(name)) {
            var attr = attributes[name];

            if (attr.valueIndex !== undefined
                || (!match[5] && attr.nameIndex !== undefined)) {
                continue;
            }

            var nameIndex = openIndex + match.index + match[1].length;
            attr.nameIndex = nameIndex;
            attr.rawValue = match[3];

            if (match[5]) {
                attr.valueIndex = nameIndex
                                + match[2].length + match[4].length;
            }
        }
    }
    Object.keys(attributes).forEach(function (name) {
        var attr = attributes[name];
        if (attr.valueIndex === undefined) {
            attr.valueIndex = attr.nameIndex;
        }
    });
};
