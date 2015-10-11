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

/*
 * Given the name and value, it finds the latest existence for returning indices.
 * Complexity is (number of attributes) * (number of attributes)
 */
module.exports.inputIndices = function (attributes, openTag, openIndex) {
    var match = attrRegex.exec(openTag),
        matches = [];

    // get the matches once only
    while (match) {
        matches.push(match);
        match = attrRegex.exec(openTag);
    }

    Object.keys(attributes).forEach(function (name) {
        var valueObject = attributes[name];

        for (var index = 0; index < matches.length; index++) {
            var match = matches[index];


            if (match[1]) {
                match[1] = match[1].trim();
            }

            if (name === match[1]) {
                var nameIndex = openIndex + match.index + (match[0].indexOf(match[1]));
                valueObject.nameIndex = nameIndex;
                valueObject.valueIndex = nameIndex;
                valueObject.attributeContext = match[0];
            }

            if (!match[1] || !match[2] || !match[3]) {
                continue;
            }

            if (name === match[1] && match[3].indexOf(valueObject.value) > -1) {
                valueObject.valueIndex = nameIndex + match[1].length + (match[2].indexOf(match[3])) + 1;
                break;
            }
        }
    });
};
