var Issue = require('../issue');

module.exports = {
    name: 'input-radio-req-name',
    labels: {},
    inputsInfo: [],
    on: ['tag'],
    filter: ['input']
};

module.exports.end = function () {
    return [];
};

module.exports.lint = function (element, opts) {
    if (!opts[this.name]) {
        return [];
    }

    
    return [];
};