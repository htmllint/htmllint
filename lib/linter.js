var lodash = require('lodash'),
    Parser = require('./parser'),
    rqall = require('require-all'),
    path = require('path');

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

Linter.prototype.lint = function (html) {

    //environments
    var envs = rqall(path.join(__dirname, '/envs')),
        params = lodash.flatten(arguments),
        opts = lodash.cloneDeep(envs.none);

    for (var i = 1; i < params.length; i++) {
        if ( typeof params[i] === 'string') {
            params[i] = envs[params[i]] || {};
        }
    }

    //we can do this because the first param is our html string
    params[0] = opts;
    opts = lodash.merge.apply(lodash, params);

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
    //scanIssues = this.execRule(lines, 'scan', null, opts);

    // Get our DOM linted
    domIssues = this.execDom(dom, opts);
    //domIssues = this.execRule(dom, 'process', null, opts);

    // Output for Debugging
//    if (scanIssues.length > 0) console.log("scanIssues: " + scanIssues.length + ": " + JSON.stringify(scanIssues, null, 2));
//    if (domIssues.length > 0) console.log("domIssues: " + domIssues.length + ": " + JSON.stringify(domIssues, null, 2));

    // Return to sender
    return lodash.first(scanIssues.concat(domIssues), maxerr);
};

Linter.prototype.execLines = function (lines, opts) {
    var linter = this,
        ruleNames = Object.keys(this.rules).filter(function (ruleName) {
            //console.log('process');
            return this.rules[ruleName]['scan'];
        }.bind(this));

    return lodash(lines).map(function (line) {
        // inline goes here

        return lodash(ruleNames).map(function (ruleName) {
            var rule = linter.rules[ruleName];
            return rule['scan'].apply(rule, [line, opts]);
        }).flatten().compact().value();
    }).flatten().value();
}

Linter.prototype.execDom = function (dom, opts) {
    var linter = this,
        ruleNames = Object.keys(this.rules).filter(function (ruleName) {
            return this.rules[ruleName]['process'];
        }.bind(this));


    var getIssues = function (element) {
        var array = lodash(ruleNames).map(function (ruleName) {
            var rule = linter.rules[ruleName];
            if (!rule.trigger || rule.trigger.indexOf(element.name) > -1) {
                return rule['process'].apply(rule, [element, opts]);
            }
            else return [];
        }).flatten().compact().value();

        if (element.children && element.children.length > 0) {
            element.children.forEach(function (child) {
                array = array.concat(getIssues(child));
            })
        }
        return array;
    }
    var issues = dom[0] ? getIssues(dom[0]) : [];
    return issues;
}


Linter.prototype.execRule = function (subjects, funcName, loopFunc, opts) {
    // Get the (line xor dom) rules once, not inside of a loop.
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
        if (loopFunc) {
            loopFunc.apply(linter, [subject]);
        }

        return lodash(rules).map(function (rule) {
                // must be 'process' and have no trigger or a matching trigger, OR be 'scan'
                if ((funcName == 'process' && (!rule.trigger || rule.trigger.indexOf(subject.name) > -1)) || (funcName == 'scan')) {
                    //console.log(funcName + ": " + rule.name);
                    return rule[funcName].apply(rule, [subject, opts]);
                } else return false;
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
