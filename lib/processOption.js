var lodash = require('lodash');

var formats = {
    lowercase: /^[a-z][a-z\d]*$/,
    underscore: /^[a-z][a-z\d]*(_[a-z\d]+)*$/,
    dash: /^[a-z][a-z\d]*(-[a-z\d]+)*$/,
    camel: /^[a-zA-Z][a-zA-Z\d]*$/,
    bem: /^([a-z][a-z\d]*(-[a-z\d]+)*(--[a-z\d]+)*(__[a-z\d]+)*)+$/
};

module.exports = {
    bool: function (option) {
        return option ? true : false;
    },
    boolPlus: function (option) {
        return function (o) {
            return o === option ? option : o ? true : false;
        }
    },
    arrayOfStr: function (o) {
        return lodash.isArray(o) && lodash.every(o, lodash.isString)
            ? o : undefined;
    },
    options: function (opts) {
        return function (o) {
            return opts.indexOf(o) > -1 ? o : undefined;
        }
    },
    regex: function (regex) { return new RegExp(regex); },
    posInt: function (i) {
        return (lodash.isInteger(i) && i >= 0) ? i : undefined;
    },
    format: function (name) {
        var regex = lodash.isRegExp(name) ? name : formats[name];

        return {
            name: name,
            test: regex ? regex.test.bind(regex) : regex
        }
    }
};
