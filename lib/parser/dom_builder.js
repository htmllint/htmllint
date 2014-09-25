var htmlparser2 = require('htmlparser2'),
    util = require('util'),
    DomHandler = htmlparser2.DomHandler,
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
}

// jscs:disable disallowDanglingUnderscores
DomBuilder.prototype._addDomElement = function (ele) {
    if (!this.parser) {
        // TODO: rewrite error msg
        throw Error('stop being a bone head >.<');
    }
    ele.index = this.parser.startIndex;
    DomHandler.prototype._addDomElement.call(this, ele);
};
// jscs:enable disallowDanglingUnderscores
