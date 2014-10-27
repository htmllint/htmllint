var lodash = require('lodash');
var bulk = require('bulk-require');

var envs = bulk(__dirname, '!(index).js');
module.exports.envs = envs;

module.exports.flattenOpts = function (optList) {
    var options = {};

    optList.forEach(function (opt) {
        if (lodash.isString(opt)) {
            opt = envs[opt];
        }

        lodash.assign(options, opt);
    });

    return options;
};
