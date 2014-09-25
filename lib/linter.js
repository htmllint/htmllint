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
        lines = null;

    // break up the html into array of objects of lines
    lines = this.shred(html);

    // process dom
    dom = this.parser.parse(html);

    scanIssues = this.execRule(lines, 'scan', null, opts);
    domIssues = this.execRule(dom, 'process', null, opts);

    if (scanIssues.length > 0) console.log("scanIssues: " + scanIssues.length + ": " + JSON.stringify(scanIssues, null, 2));
    if (domIssues.length > 0) console.log("domIssues: " + domIssues.length + ": " + JSON.stringify(domIssues, null, 2));
    
    return lodash.first(scanIssues.concat(domIssues), maxerr);
};

Linter.prototype.execRule = function (subjects, funcName, loopFunc, opts) {
    var linter = this,
        rules = lodash(Object.keys(this.rules))
            .map(function (ruleName) {
                var rule = this.rules[ruleName];
                return rule[funcName] ? rule : null;
            }.bind(this))
            .flatten()
            .compact()
            .value();

    return lodash(subjects).map(function (subject) {

        // Run our 'callback' (for making the inline config object)
        if (loopFunc) {loopFunc.apply(linter, [subject]);}
        
        return lodash(rules).map(function (rule) {
            if ((funcName == 'process' && (!rule.trigger || rule.trigger.indexOf(subject.name) > -1)) || (funcName == 'scan'))
            {
                //console.log(funcName + ": " + rule.name);
                return rule[funcName].apply(rule, [subject, opts]);
            }
            else return false;
        }.bind(linter))
            .flatten()
            .compact()
            .value();
        
        //console.log("innerstuff[ "+funcName+" ]: " + innerstuff.length + ": " + JSON.stringify(innerstuff, null, 2));
        //return innerstuff;
    }).flatten().value();
    
    //console.log("stuff[ "+funcName+" ]: " + stuff.length + ": " + JSON.stringify(stuff, null, 2));
    //return stuff;
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

//Linter.prototype.inlineConfig = function (line) {
//    // takes a string, returns the config changes
//    return false;
//}