var Issue = require('../issue');

module.exports = {
    name: 'focusable-tabindex-style',
    on: ['tag'],
    filter: ['a', 'area', 'button', 'input', 'img', 'select', 'textarea'],

    detectedStyle: null
};

module.exports.end = function () {
    this.detectedStyle = null;
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name] || this.isDisabled(element)) {
        return [];
    }

    var tabIndexStyle = this.getTabIndexStyle(element);

    if (this.detectedStyle !== null &&
        this.detectedStyle !== tabIndexStyle) {
        // unused?
        // var data = { op: tabIndexStyle ? 'remove the tabindex' : 'add a positive tabindex'  };

        return new Issue('E026', element.openLineCol);
    }

    this.detectedStyle = tabIndexStyle;
    return [];
};

module.exports.isDisabled = function (element) {
    return element.attribs && element.attribs.hasOwnProperty('disabled');
};

module.exports.getTabIndexStyle = function (element) {
    if (!element.attribs || !element.attribs.hasOwnProperty('tabindex')) {
        return false;
    }

    return element.attribs.tabindex.value > 0;
};
