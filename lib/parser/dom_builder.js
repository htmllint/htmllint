var htmlparser2 = require('htmlparser2'),
    util = require('util'),
    knife = require('../knife');
var DomHandler = htmlparser2.DomHandler,
    DomBuilder = function () {
        this.parser = null;
        this.attributes = {};
        this.attribArr = [];
        this.dupes = [];
        DomHandler.apply(this, Array.prototype.slice.call(arguments));
    };
module.exports = DomBuilder;

util.inherits(DomBuilder, DomHandler);

// NOTE: this must be called before parsing begins
DomBuilder.prototype.initialize = function (parser) {
    this.parser = parser;
};

DomBuilder.prototype.onerror = function (error) {
    // TODO: actually bubble this up or queue errors
    throw error;
};

DomBuilder.prototype.onattribute = function (name, value) {
    if (!this.attributes[name]) {
        this.attributes[name] = {
            value: value
        };
        this.attribArr.push(name);
    } else {
        this.dupes.push(name);
    }
};

/*eslint-disable no-underscore-dangle*/
DomBuilder.prototype.onopentag = function (name, attribs) {
    DomHandler.prototype.onopentag.call(this, name, attribs);

    var ele = this._tagStack[this._tagStack.length - 1];
    ele.open = this.htmlText.slice(this.parser.startIndex + 1, this.parser.endIndex);
    ele.openLineCol = this.lineColFunc(this.parser.startIndex);
    ele.openIndex = this.parser.startIndex;
    if (ele.hasOwnProperty('lineCol')) {
        // remove duplicate data
        delete ele.lineCol;
    }

    ele.attribs = this.attributes;
    //ele.attribsArr = this.attribArr;
    knife.inputIndices(ele.attribs, ele.open, ele.openIndex);

    this.attribArr
	    .sort(function (a, b) {
		    return ele.attribs[a].nameIndex - ele.attribs[b].nameIndex;
	    })
	    .forEach(function (attrib) {
            ele.attribs[attrib].nameLineCol = this.lineColFunc(ele.attribs[attrib].nameIndex);
            ele.attribs[attrib].valueLineCol = this.lineColFunc(ele.attribs[attrib].valueIndex);
        }, this);

    this.attribArr = [];
    this.attributes = {};

    ele.dupes = this.dupes;
    this.dupes = [];
};

DomBuilder.prototype.onclosetag = function () {
    var ele = this._tagStack[this._tagStack.length - 1];

    if (ele && !knife.isVoidElement(ele.name)) {
        ele.close = this.htmlText.slice(this.parser.startIndex + 2, this.parser.endIndex);
        ele.closeIndex = this.parser.startIndex;
        ele.closeLineCol = this.lineColFunc(this.parser.startIndex);
    }

    DomHandler.prototype.onclosetag.call(this);
};

DomBuilder.prototype.onprocessinginstruction = function (name, data) {
    // htmlparser2 doesn't normally update the position when processing
    // declarations or processing directives (<!doctype ...> or <?...> elements)
    this.parser._updatePosition(2);
    DomHandler.prototype.onprocessinginstruction.call(this, name, data);
};

DomBuilder.prototype._addDomElement = function (ele) {
    if (!this.parser) {
        // TODO: rewrite error msg
        throw new Error('stop being a bone head >.<');
    }
    ele.index = this.parser.startIndex;
    ele.lineCol = this.lineColFunc(ele.index);
    DomHandler.prototype._addDomElement.call(this, ele);
};
/*eslint-enable no-underscore-dangle*/
