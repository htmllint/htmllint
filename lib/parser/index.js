var htmlparser2 = require('htmlparser2');
var DomBuilder = require('./dom_builder');

var Parser = function () {
    this.domBuilder = new DomBuilder();

    // more information for these options can be found at:
    // https://github.com/fb55/htmlparser2/wiki/Parser-options
    this.parser = new htmlparser2.Parser(this.domBuilder, {
        decodeEntities: false,
        lowerCaseAttributeNames: false,
        lowerCaseTags: false,
        recognizeCDATA: false,
        // TODO: experiment with this option
        recognizeSelfClosing: false,
        xmlNode: false
    });
    this.domBuilder.initialize(this.parser);
};
module.exports = Parser;

// Given the raw html text, produce a function that transforms an index
// into a line and column number. Indices must be passed to the resulting
// function in order.
function getLineColFunc(htmlText) {
    var lastInd = 0,
        line = 0, col = 0;
    return function(i) {
        if (i < lastInd) {
            throw new Error('Indices passed to line/column'
                    + ' function are not in order');
        }
        while (lastInd < i) {
            if (htmlText[lastInd] === '\n') { col = 0; line++; }
            else { col++; }
            lastInd++;
        }
        return [line + 1, col + 1];
    };
}

Parser.prototype.parse = function (htmlText) {
    var dom = null;

    // expose the raw html text to the dom builder
    // TODO: this is a tad ugly
    this.domBuilder.htmlText = htmlText;
    this.domBuilder.lineColFunc = getLineColFunc(htmlText);

    // write to the parser
    this.parser.write(htmlText);
    this.parser.end();
    // htmlparser2 is insane >.>
    this.parser.startIndex = 0;
    this.parser.endIndex = -1;

    // store the dom and reset the parser/handler
    dom = this.domBuilder.dom;
    this.parser.reset();

    return dom;
};
