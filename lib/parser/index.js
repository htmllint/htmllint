var lodash = require('lodash'),
    htmlparser2 = require('htmlparser2');
var DomBuilder = require('./dom_builder'),
    DomHandler = htmlparser2.DomHandler;

var Parser = function () {
    var domBuilder = this.domBuilder = new DomBuilder();

    domBuilder.onopentag = function onopentag(name, attribs) {
        DomHandler.prototype.onopentag.call(this, name, attribs);
        var ele = lodash.last(this._tagStack);
        ele.open = this.htmlText.slice(
            this.parser.startIndex + 1, this.parser.endIndex);
    };
    domBuilder.onclosetag = function onclosetag() {
        var ele = lodash.last(this._tagStack);
        ele.close = this.htmlText.slice(
            this.parser.startIndex + 2, this.parser.endIndex);
        DomHandler.prototype.onclosetag.call(this);
    };

    // more information for these options can be found at:
    // https://github.com/fb55/htmlparser2/wiki/Parser-options
    this.parser = new htmlparser2.Parser(domBuilder, {
        decodeEntities: false,
        lowerCaseAttributeNames: false,
        lowerCaseTags: false,
        recognizeCDATA: false,
        // TODO: experiment with this option
        recognizeSelfClosing: false,
        xmlNode: false
    });
    domBuilder.initialize(this.parser);
};
module.exports = Parser;

Parser.prototype.parse = function (htmlText) {
    var dom = null;
    this.domBuilder.htmlText = htmlText;

    // write to the parser
    this.parser.write(htmlText);
    this.parser.end();

    // store the dom and reset the parser/handler
    dom = this.domBuilder.dom;
    this.parser.reset();

    return dom;
};
