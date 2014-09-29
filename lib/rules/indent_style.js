module.exports = {
    name: 'indent-style',
    description: [
        'User may set to use only tabs ("tabs"), only spaces ',
        '("spaces"), or either but not both ("nonmixed") in ',
        'indentions.'
    ].join(''),
    default: 'nonmixed'
};

module.exports.scan = function (html, opts) {
    var style = (opts && opts[module.exports.name]) ? opts[module.exports.name] : module.exports.default,
        chosenRegex = '',
        mixedRegex = /^(\t+ +| +\t+)+/, //looking for mixing on the same line
        chosenMatches,
        mixedMatches;

    /*
     * NONMIXED
     * any space between the start and first non-whitespace character to be different from the previous line.
     *
     * TABS
     * any space between the start and first non-whitespace character to be non-tabs whitespace.
     *
     * SPACES
     * any space between the start and first non-whitespace character to be non-space whitespace.
     */

    switch (style) {
    case 'nonmixed':
        chosenRegex = /((^ +\S)(.*\n)*(^\t+[\S\n])|(^\t+\S)(.*\n)*(^ +[\S\n]))/mg; // looking for space after tab or vice versa
        // or (^ +[\S\n](.*\n)*^\t+[\S\n]|^\t+[\S\n](.*\n)*^ +[\S\n])
        break;
    case 'tabs':
        chosenRegex = /^[ ]+(?=[\S\n])/mg; //looking for spaces
        break;
    case 'spaces':
        chosenRegex = /^[\t]+(?=[\S\n])/mg; //looking for tabs
        break;
    default:
    }

    // run the chosenRegex first, then the mixedRegex
    chosenMatches = chosenRegex.exec(html) || [];
    mixedMatches = mixedRegex.exec(html) || [];
    
    return (chosenMatches.concat(mixedMatches)).map(function (string) {
        return {
            index: 0, // TODO: find a way to spit out line number for regex match
            msg: 'found whitespace other than ' + style + ' for indentation'
        };
    });
};
