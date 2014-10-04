var lodash = require('lodash'),
    DomUtils = require('htmlparser2').DomUtils;
var knife = require('../knife');

module.exports = {
    name: 'label-for',
    trigger: ['label'],
    description: 'Require for attributes on label elements.'
};

function issue(ele, msg) {
    return {
        index: ele.index,
        line: ele.openLineCol[0],
        column: ele.openLineCol[1],
        msg: msg
    };
}

module.exports.findMatch = function (ele, id) {
    // TODO: shouldn't be this hard...
    var rElem = ele;
    while (rElem.parent !== null) {
        rElem = rElem.parent;
    }
    while (rElem.prev !== null) {
        rElem = rElem.prev;
    }

    var roots = [];
    while (rElem !== null) {
        roots.push(rElem);
        rElem = rElem.next;
    }

    return DomUtils.findOne(function (e) {
        return e.attribs.id === id;
    }, roots);
};

module.exports.hasValidChild = function (ele) {
    // test for any element to be labeable
    return lodash.some(ele.children, knife.isLabeable);
};

module.exports.process = function (ele, opts) {
    if (!opts[this.name]) {
        return null;
    }

    // whether or not all labels MUST have a for attr,
    // regardless of whether the label has children
    var strict = (opts[this.name] === 'strict'),
        hasFor = ele.attribs.hasOwnProperty('for');

    if (hasFor) {
        var match = this.findMatch(ele, ele.attribs['for']);
        if (!match) {
            // the id in the for attr doesn't exist on the page
            return issue(ele, "label's `for` attribute doesn't match any ids");
        } else if (!knife.isLabeable(match)) {
            return issue(ele, "label's `for` attribute doesn't match a labeable element");
        }
    }

    // strict mode checking
    if (strict) {
        if (!hasFor) {
            // all labels should have a for attr in strict mode
            return issue(ele, 'all labels should have a `for` attribute');
        }
        return null;
    }

    // not in strict mode and any for attrib will have a valid id
    // check for a valid labeable child (valid in non strict mode)
    if (!hasFor && !this.hasValidChild(ele)) {
        return issue(ele, "label doesn't have labeable child");
    }

    return null;
};
