var bulk = require('bulk-require'),
    lodash = require('lodash');

// require all the utils we've made
var utilExports = bulk(__dirname, '!(index).js'),
    utilMixin = lodash
        .values(utilExports)
        .reduce(function (agg, val) {
            lodash.mixin(agg, val);
            return agg;
        }, {});

// mixin our utilities into lodash
lodash.mixin(utilMixin);

module.exports = lodash;
