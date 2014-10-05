var lodash = require('lodash');

var formats = {
    lowercase: /^[a-z][a-z\d]*$/,
    underscore: /^[a-z][a-z\d]*(_[a-z][a-z\d]*)*$/,
    dash: /^[a-z][a-z\d]*(-[a-z][a-z\d]*)*$/,
    camel: /^[a-zA-Z][a-zA-Z\d]*$/
};
var formatTests = lodash.mapValues(formats, function (regex) {
    return regex.test.bind(regex);
});

module.exports = {
    getFormatTest: function(name) {
        return formatTests[name];
    },
    getIdStyleRegex: function (name) {
        return formats[name];
    }
};
