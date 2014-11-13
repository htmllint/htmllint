var lodash = require('lodash');
var bulk = require('bulk-require');

var presets = bulk(__dirname, '!(index).js');
module.exports.presets = presets;

module.exports.flattenOpts = function (optList) {
    var options = {};

    optList.forEach(function (opt) {
        if (lodash.isString(opt)) {
            opt = presets[opt];
        }

        lodash.assign(options, opt);
    });

    return options;
};
