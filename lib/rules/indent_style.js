module.exports = {
    name: 'indent-style',
    description: [
        'User may set to use only tabs ("tabs"), only spaces ',
        '("spaces"), or either but not both ("nonmixed") in ',
        'indentions.'
    ].join(''),
    default: 'nonmixed'
};

module.exports.end = function (opts) {
    delete this.current;
};

function test(regex, msg, line) {
    var error = regex.exec(line.line) || false;
    if (error) {
        return {
            index: error.index + line.index,
            row: line.row,
            column: error.index + 1,
            msg: msg
        };
    }

    return [];
}

module.exports.scan = function (line, opts) {
    //console.log(line);
    var format = opts['indent-style'];
    if (format === 'false') {
        return [];
    }
    format = format || this.default;

    var regex = {
        inmixed: /^(\t+ +| +\t+)+/, // matches tabs following spaces or spaces following tabs
        spaces: /^([ ]+)(?=[\S\n])/, // matches spaces
        tabs: /^([\t]+)(?=[\S\n])/, // matches tabs
        any: /^([ \t]+)(?=[\S\n])/ // matches either
    };

    // if there are no tabs or spaces on this line, don't bother
    if (!line.line.match(regex.any)) {
        return [];
    }

    // if there is inmixing on this line, that's an error.
    var inmixMatch = regex.inmixed.exec(line.line);
    //console.log(inmixMatch);
    if (inmixMatch) {
        return {
            index: inmixMatch.index,
            msg: 'Mixing of tabs and spaces not allowed.'
        };
    }

    /* From this point on, we have spaces xor tabs.
     * If format is 'spaces' check for tabs.
     * If format is 'tabs' check for spaces.
     * If 'nonmixed' and this.current is 'spaces', check for tabs.
     * If 'nonmixed' and this.current is 'tabs', check for spaces.
     * If 'nonmixed' and this.current is false, figure out what it is and do nothing.
     */

    var match = false;
    if (format === 'spaces')
    {
        match = test(regex.tabs, 'Tabs not allowed on this line', line);
    }
    else if (format === 'tabs')
    {
        match = test(regex.spaces, 'Spaces not allowed on this line', line);
    }
    else if (this.current === 'spaces')
    {
        match = test(regex.tabs, 'Tabs not allowed on this line, spaces seen previously', line);
    }
    else if (this.current === 'tabs')
    {
        match = test(regex.spaces, 'Spaces not allowed on this line, tabs seen previously', line);
    }
    //console.log(match);
    if (match) {
        return match;
    }

    if (!this.current) {
        this.current = (line.line.match(regex.spaces)) ? 'spaces' : 'tabs';
    }
};
