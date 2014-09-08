var htmlparser2 = require('htmlparser2'),
    DomBuilder = require('./dom_builder');

var Parser = module.exports = function () {
    this.domBuilder = new DomBuilder();

    this.parser = new htmlparser2.Parser(this.domBuilder, {
        lowerCaseTags: false
    });
    this.domBuilder.initialize(this.parser);
};

Parser.prototype.parse = function (htmlText) {
    var dom = null;

    // write to the parser
    this.parser.write(htmlText);
    this.parser.end();

    // store the dom and reset the parser/handler
    dom = this.domBuilder.dom;
    this.parser.reset();

    return dom;
};
