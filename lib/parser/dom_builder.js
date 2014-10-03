var htmlparser2 = require('htmlparser2'),
    util = require('util');
var DomHandler = htmlparser2.DomHandler,
    DomBuilder = function () {
        this.parser = null;
        DomHandler.apply(this, Array.prototype.slice.call(arguments));
    };
module.exports = DomBuilder;

util.inherits(DomBuilder, DomHandler);

// NOTE: this must be called before parsing begins
DomBuilder.prototype.initialize = function (parser) {
    this.parser = parser;
};

DomBuilder.prototype.onerror = function (error) {
    console.log(error);
    console.log('QUIT PROGRAM (test)');
};

/*eslint-disable no-underscore-dangle*/
DomBuilder.prototype.onopentag = function (name, attribs) {
    DomHandler.prototype.onopentag.call(this, name, attribs);

    var ele = this._tagStack[this._tagStack.length - 1];
    ele.open = this.htmlText.slice(this.parser.startIndex + 1, this.parser.endIndex);
    ele.openLineCol = this.lineColFunc(this.parser.startIndex);
};

DomBuilder.prototype.onclosetag = function () {
    var ele = this._tagStack[this._tagStack.length - 1];
    ele.close = this.htmlText.slice(this.parser.startIndex + 2, this.parser.endIndex);
    ele.closeLineCol = this.lineColFunc(this.parser.startIndex);

    DomHandler.prototype.onclosetag.call(this);
};

DomBuilder.prototype._addDomElement = function (ele) {
    if (!this.parser) {
        // TODO: rewrite error msg
        throw new Error('stop being a bone head >.<');
    }
    ele.index = this.parser.startIndex;
    DomHandler.prototype._addDomElement.call(this, ele);
};
/*eslint-enable no-underscore-dangle*/
