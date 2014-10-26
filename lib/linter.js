var lodash = require('lodash'),
    Parser = require('./parser'),
    knife = require('./knife'),
    envs = require('./envs'),
    RuleList = require('./rule_list');

/**
 * A linter is configured with a set of rules that are fed the raw
 * html and ast nodes.
 * @constructor
 */
var Linter = function (rules) {
    this.rules = RuleList.fromRuleMap(rules);
    this.parser = new Parser();
};
module.exports = Linter;

/**
 * Assigns a rule to the Linter's rule object.
 * @param {Object} rule - your custom rule to add.
 */
Linter.prototype.addRule = function (rule) {
    this.rules.addRule(rule);
};

/**
 * Lints the HTML with the options supplied in the environments setup.
 * @param {String} html - the html as a string to lint.
 */
Linter.prototype.lint = function (html) {
    // options are specified after the first arg
    var options = Array.prototype.slice.call(arguments, 1),
        opts = null;

    // flatten any arrays
    options = lodash.flatten(options);
    // add the default preset
    options.unshift({}, envs['default']);

    // merge the option presets
    opts = lodash.assign.apply(lodash, options);

    var dom = null,
        scanIssues = [],
        domIssues = [],
        maxerr = (opts ? opts.maxerr : null) || 30,
        lines = null;

    // break up the html into array of objects of lines
    lines = knife.shred(html);

    // process dom
    dom = this.parser.parse(html);

    // TODO: this is ugly, subscription handling needs a redo
    lodash.forOwn(this.rules.rulesMap, function (rule) {
        rule.subscribers = [];
    });
    var subscriptions = this.rules.subsMap;
    lodash.forOwn(subscriptions, function (handlers, ruleName) {
        this.rules.getRule(ruleName).subscribers = handlers;
    }.bind(this));

    // Get our lines linted
    scanIssues = this.rules.getRule('line').lint(lines, opts);

    // Get our DOM linted
    domIssues = this.rules.getRule('dom').lint(dom, opts);

    this.rules.forEach(function (rule) {
        if (rule.end) {
            rule.end(opts);
        }
    });

    // Return to sender
    return lodash.first(scanIssues.concat(domIssues), maxerr);
};
