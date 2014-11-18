var Issue = require('../issue');

module.exports = {
    name: 'input-radio-req-name',
    labels: {},
    inputsInfo: [],
    on: ['tag'],
    filter: ['input']
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name]) {
        return [];
    }

    // if it's not a radio-type input, ignore it
    if (!element.attribs.hasOwnProperty('type') || !(element.attribs.type.value === 'radio')) {
        return [];
    }

    var a = element.attribs;
    if (a.hasOwnProperty('name') && a.name && a.name.value && a.name.value.length > 0) {
        return [];
    }

    return new Issue('E034', element.openLineCol);
};