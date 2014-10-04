var bulk = require('bulk-require'),
    lodash = require('lodash'),
    Parser = require('./parser'),
    path = require('path');
var envs = bulk(path.join(__dirname, '/envs'), '*.js');

/**
 * A linter is configured with a set of rules that are fed the raw
 * html and ast nodes.
 * @constructor
 */
var Linter = function (rules) {
    this.rules = rules || {};
    this.parser = new Parser();
};
module.exports = Linter;

/**
 * Assigns a rule to the Linter's rule object.
 * @param {Object} rule - your custom rule to add.
 */
Linter.prototype.addRule = function (rule) {
    this.rules[rule.name] = rule;
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

    //stuff
    var dom = null,
        scanIssues = [],
        domIssues = [],
        maxerr = (opts ? opts.maxerr : null) || 30,
        lines = null;

    // break up the html into array of objects of lines
    lines = this.shred(html);

    // process dom
    dom = this.parser.parse(html);

    // Get our lines linted
    scanIssues = this.execLines(lines, opts);

    // Get our DOM linted
    domIssues = this.execDom(dom, opts);

    // call the end handler on rules
    lodash.forOwn(this.rules, function (rule) {
        if (rule.end) {
            rule.end(opts);
        }
    });

    // Return to sender
    return lodash.first(scanIssues.concat(domIssues), maxerr);
};

Linter.prototype.execLines = function (lines, opts) {
    var linter = this,
        ruleNames = Object.keys(this.rules).filter(function (ruleName) {
            return this.rules[ruleName].scan;
        }.bind(this));

    return lodash(lines).map(function (line, index) {
        if (index === 0) {return false;}

        // inline goes here

        return lodash(ruleNames).map(function (ruleName) {
            var rule = linter.rules[ruleName];
            return rule.scan.apply(rule, [line, opts]);
        }).flatten().compact().value();
    }).flatten().compact().value();
};

Linter.prototype.execDom = function (dom, opts) {
    var linter = this,
        ruleNames = Object.keys(this.rules).filter(function (ruleName) {
            return this.rules[ruleName].process;
        }.bind(this));

    var getIssues = function (element) {
        var ret = lodash(ruleNames).map(function (ruleName) {
            var rule = linter.rules[ruleName];
            if (!rule.trigger || rule.trigger.indexOf(element.name) > -1) {
                return rule.process.apply(rule, [element, opts]);
            } else {
                return [];
            }
        }).flatten().compact().value();

        if (element.children && element.children.length > 0) {
            element.children.forEach(function (child) {
                ret = ret.concat(getIssues(child));
            });
        }
        return ret;
    };

    var issues = dom.length ? dom.map(getIssues) : [];
    return lodash.flatten(issues);
};


/**
 * 'Shreds' the html by line for linting by line.
 * @param {String} html - your html.
 * @returns {String[]} the array of line objects.
 */
Linter.prototype.shred = function (html) {
    // Take the HTML string
    // Return an array of {line, line number, index}
    var shredder = /(.*)\n/g,
        row = 1,
        line = shredder.exec(html),
        shredded = [];

    while (line) {
        shredded[row] = {
            'line': line[0],
            'index': line.index,
            'row': row
        };
        row++;
        line = shredder.exec(html);
    }

    return shredded;
};
