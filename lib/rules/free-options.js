/*
 * Some options are used directly by the linter and do not control any
 * rules. Since we still want to process the values for these options
 * and generate documentation for them, we use a dummy rule which is
 * never called to contain them. It will be imported with the other
 * rules.
 */
var lodash = require('lodash');

module.exports = {
    name: 'free-options',
    options: [{
        name: 'maxerr',
        desc: [
'A nonnegative integer, or `false`. If it is a positive integer, limit',
'output to at most that many issues.'
].join('\n'),
        process: function (i) {
            return lodash.isInteger(i) ? (i > 0 && i) : undefined;
        }
    }]
};
