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
        lines = knife.shred(html),
        dom = this.parser.parse(html),
        issues = null,
        maxerr = (!opts.maxerr && opts.maxerr !== 0 ? Infinity : opts.maxerr);

    issues = this.rules.initOptions(opts);
    this.setupInlineConfigs(dom);

    issues = issues.concat(this.lintByLine(lines, opts));
    issues = issues.concat(this.lintDom(dom, opts));

    issues = issues.concat(this.resetRules(opts));
    this.inlineConfig.clear();

    if (maxerr >= 0) {
        issues = lodash.take(issues, maxerr);
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

    optList.unshift('default');

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
    var comments = [];
    var feedComments = function (element) {
        if (element.type === 'comment') {
            comments.push(element);
            this.inlineConfig.feedComment(element);
        }
        if (element.children && element.children.length > 0) {
            element.children.forEach(function (child) {
                feedComments(child);
            });
        }
    }.bind(this);
    if (dom.length) {
        dom.forEach(feedComments);
    }
};
