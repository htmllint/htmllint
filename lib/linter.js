var lodash = require('lodash'),
    Parser = require('./parser');

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

Linter.prototype.addRule = function (rule) {
    this.rules[rule.name] = rule;
};

Linter.prototype.lint = function (html, opts) {
    opts = opts || {};
    var dom = null,
        scanIssues = null,
        domIssues = null,
        maxerr = (opts ? opts.maxerr : null) || 30,
        lines = null,
        lineConfigs = [],
        issues = [];

    // break up the html into array of objects of lines
    lines = this.shred(html);

    // get our inline rules
    var inlineRules = this.getRules('scan');

    // scan raw html string
    scanIssues = lodash(lines).map(function (lineObject) {
        // TODO add config building object here
        var config = this.inlineConfig(lineObject.line);
        if (config) {
            config.forEach(function (change) {
                lineConfigs[change.index] = change;
            });
        }

        inlineRules.forEach(function (rule) {
            issues.push(rule['scan'].apply(rule, [lineObject.line, opts]))
        })

        return issues;
    }.bind(this))
        .flatten()
        .compact()
        .value();

    // process dom
    dom = this.parser.parse(html);

    var elementRules = this.getRules('process');

    domIssues = this.execRules('process', [dom, opts]);



    return lodash.first(scanIssues.concat(domIssues)
        //.map(function (issue) {
        //    // TODO: implement more efficiently
        //    var pos = Linter.getPos(html, issue.index);
        //
        //    issue.line = pos.line;
        //    issue.column = pos.column;
        //
        //    return issue;
        //})
        , maxerr);
};

Linter.prototype.getRules = function (funcName) {
    return lodash(Object.keys(this.rules))
        .map(function (ruleName) {
            var rule = this.rules[ruleName];
            return rule[funcName] ? rule : null;
        }.bind(this))
        .flatten()
        .compact();
};


Linter.prototype.shred = function (html) {
    // Take the HTML string
    // Return an array of {line, line number, index}
    var re_newLine = /(.*)\n/g,
        row = 1,
        line = re_newLine.exec(html),
        shredded = [];

    while (line) {
        shredded[row] = {
            'line': line[0],
            'index': line.index
        };
        row++;
        line = re_newLine.exec(html);
    }

    return shredded;
};

Linter.prototype.inlineConfig = function (line) {
    // takes a string, returns the config changes

    return false;
}

Linter.getPos = function (str, index) {
    // TODO: reimplement, probs buggy
    // TODO: write tests
    // TODO: move out of this into some utility module perhaps?
    var re = /\n/g,
        row = 1, // line numbers start at 1 in most text editors
        cursor = re.exec(str),
        lastCursor = -1;

    while (cursor && cursor.index < index) {
        // advance to the next line
        lastCursor = cursor.index;
        cursor = re.exec(str);
        row += 1;
    }

    return {
        line: row,
        column: index - lastCursor
    };
};
