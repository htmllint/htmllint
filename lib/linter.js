var Promise = require('promise');
var lodash = require('lodash'),
    Parser = require('./parser'),
    knife = require('./knife'),
    presets = require('./presets'),
    Config = require('./config'),
    InlineConfig = require('./inline_config');

/**
 * A linter is configured with a set of rules that are fed the raw
 * html and ast nodes.
 * @constructor
 */
var Linter = function (rules, options) {
    this.rules = new Config(rules, options);
    this.parser = new Parser();
    this.inlineConfig = new InlineConfig(this.rules);
};
module.exports = Linter;

/**
 * Adds a plugin to the linter.
 * @param {Object} plugin - the plugin to add to the linter.
 */
Linter.prototype.use = function (plugin) {
    if (plugin.rules) {
        plugin.rules.forEach(function (rule) {
            this.rules.addRule(rule);
        }.bind(this));
    }
};

/**
 * Lints the HTML with the options supplied in the environments setup.
 * @param {String} html - the html as a string to lint.
 */
Linter.prototype.lint = function (html) {
    var opts = Linter.getOptions(arguments),
        issues = this.rules.initOptions(opts);

    var ignore = opts['raw-ignore-regex'];
    if (ignore) html = html.replace(ignore, '');

    var lines = knife.shred(html),
        dom = this.parser.parse(html);
    issues = issues.concat(this.setupInlineConfigs(dom));

    try {
        issues = issues.concat(this.lintByLine(lines, opts));
        issues = issues.concat(this.lintDom(dom, opts));
    } finally {
        issues = issues.concat(this.resetRules(opts));
        this.inlineConfig.clear();
    }

    if (opts.maxerr) {
        issues = lodash.take(issues, opts.maxerr);
    }

    return Promise.all(issues)
        .then(function (resolved) {
            return lodash.flattenDeep(resolved);
        });
};
Linter.prototype.lint = Promise.nodeify(Linter.prototype.lint);

Linter.getOptions = function (args) {
    var optList = Array.prototype.slice.call(args, 1);
    optList = lodash.flattenDeep(optList);

    if (optList[optList.length - 1] !== 'nodefault') {
        optList.unshift('default');
    }

    return presets.flattenOpts(optList);
};

Linter.prototype.lintByLine = function (lines, opts) {
    return this.rules.getRule('line').lint(lines, opts, this.inlineConfig);
};

Linter.prototype.lintDom = function (dom, opts) {
    return this.rules.getRule('dom').lint(dom, opts, this.inlineConfig);
};

Linter.prototype.resetRules = function (opts) {
    return lodash.flattenDeep(
        this.rules.getAllRules().map(function (rule) {
            var r = rule.end && rule.end(opts);
            return r ? r : [];
        })
    );
};

Linter.prototype.setupInlineConfigs = function (dom) {
    var issues = [];
    var feedComments = function (element) {
        if (element.type === 'comment') {
            issues = issues.concat(this.inlineConfig.feedComment(element));
        }
        if (element.children) {
            element.children.map(feedComments);
        }
    }.bind(this);
    dom.forEach(feedComments);
    return issues;
};
