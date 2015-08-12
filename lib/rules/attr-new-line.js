var knife = require('../knife'),
    Issue = require('../issue');

module.exports = {
    name: 'attr-new-line',
    on: ['tag']
};

module.exports.lint = function (element, opts) {
    if ((!opts[this.name] || !element.dupes) && opts[this.name] !== 0) {
        return [];
    }

    var numberOfAttrsOnFirstRow = 0;
    var maxNumberOfAttrsOnAllRows = -1;

    var currentNumberOfAttrsInRow = 0;
    var currentRowNumber = 0;

    for(var attrName in element.attribs) {
        if(!element.attribs.hasOwnProperty(attrName)) {
            continue;
        }

        var prevRowNumber = currentRowNumber;

        if(/\n/.test(element.attribs[attrName].attributeContext)) {
            if(maxNumberOfAttrsOnAllRows < currentNumberOfAttrsInRow) {
                maxNumberOfAttrsOnAllRows = currentNumberOfAttrsInRow;
            }

            if(currentRowNumber === 0) {
                numberOfAttrsOnFirstRow = currentNumberOfAttrsInRow;
            }

            currentNumberOfAttrsInRow = 0;
            currentRowNumber++;
        }

        if(prevRowNumber === currentRowNumber) {
            currentNumberOfAttrsInRow++
        }
    }

    if(maxNumberOfAttrsOnAllRows < currentNumberOfAttrsInRow) {
        maxNumberOfAttrsOnAllRows = currentNumberOfAttrsInRow;
    }

    if(currentRowNumber === 0) {
        numberOfAttrsOnFirstRow = currentNumberOfAttrsInRow;
    }

    var lineCol = element.openLineCol || element.lineCol;

    if(numberOfAttrsOnFirstRow > opts[this.name] || maxNumberOfAttrsOnAllRows > opts[this.name]) {
        return new Issue('E037', lineCol, {
            limit: opts[this.name]
        });
    }

    return [];
};
