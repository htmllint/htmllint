var lodash = require('lodash'),
    DomUtils = require('htmlparser2').DomUtils;
var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'label-req-for',
    filter: ['label'],
    on: ['tag']
};

function issue(ele, msg) {
    return {
        name: this.name,
        index: ele.index,
        line: ele.openLineCol[0],
        column: ele.openLineCol[1],
        msg: msg
    };
}

module.exports.lint = function (ele, opts) {
    if (!opts[this.name]) {
        return [];
    }

    // whether or not all labels MUST have a for attr,
    // regardless of whether the label has children
    var strict = (opts[this.name] === 'strict'),
        hasFor = ele.attribs.hasOwnProperty('for');

    if (strict && !hasFor) {
        return new Issue('E019', ele.openLineCol);
    } else if (!strict && !hasFor && !this.hasValidChild(ele)) {
        return new Issue('E020', ele.openLineCol);
    }

    if (hasFor) {
        var id = ele.attribs['for'].value,
            forElement = this.findElementById(ele, id);

        if (!forElement) {
            // the paired element does not exist
            return new Issue('E021', ele.openLineCol, { id: id });
        } else if (!knife.isLabeable(forElement)) {
            return new Issue('E022', ele.openLineCol, { id: id });
        }
    }

    return [];
};

module.exports.findElementById = function (startElement, id) {
    // TODO: shouldn't be this hard...
    var rElem = startElement;
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
        return (e.attribs.id && e.attribs.id.value === id);
    }, roots);
};

module.exports.hasValidChild = function (ele) {
    // test for any element to be labeable
    return lodash.some(ele.children, knife.isLabeable);
};
