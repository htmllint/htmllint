// this regex can assume valid, parsable html from htmlparser2
// results in 3 possible capture groups:
// 1: the attribute name
// 2: all the text from the end of the attribute name to the end of the attribute value
// 3: attribute value, including the quotations if they exist
var attrRegex = /\s*([^ "'>=\^]+)(\s*=\s*((?:"[^"]*")|(?:'[^']*')|(?:\S+)))?/g;

module.exports.parseHtmlAttrs = function (attrs) {
    var ret = [],
        match = attrRegex.exec(attrs);

    while (match) {
        ret.push({
            name: match[1],
            valueRaw: match[3]
        });

        // assign next match
        match = attrRegex.exec(attrs);
    }

    return ret;
};
