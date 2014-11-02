var knife = require('./knife'),
    fs = require('fs'),
    path = require('path'),
    lodash = require('lodash'),
    envs = require('./envs');

/**
 * An inline configuration class is created to hold each inline configuration
 * and report back what the options should be at a certain index.
 * @constructor
 * @param {Object} newBasis - The set of options to have at the start (index 0). 
 * If not given here, it must be set with inlineConfig.reset(basis).
 */
var inlineConfig = function (newBasis) {
    this.indexConfigs = [];
    this.current = newBasis ? lodash.cloneDeep(newBasis) : this.current,
    basis = newBasis ? lodash.cloneDeep(newBasis) : basis;
}
module.exports = inlineConfig;

// regexes used for parsing the configuration comment.
var regex = {
    open: /[\s]*htmllint[\s]+(.*)/, // strip out the 'htmllint'
    name: /[a-zA-Z0-9-_]+/ // checks for a valid name (includes 'present')
};

var preset = 'preset';

// Getting the list of environment names.
var envsNames = Object.keys(envs.envs)

// Private vars, 
var index = 0, // index used for making sure configs are sent in order
    basis = null; // a copy of the original options given to us, for a reset.

/**
 * Reset the current opts to the basis. if newBasis is supplied, use that as our new basis.
 * @param {Object} newBasis - the new options to use.
 */
inlineConfig.prototype.reset = function (newBasis) {
    basis = newBasis ? lodash.cloneDeep(newBasis) : basis;
    this.current = lodash.cloneDeep(basis);
    index = 0;
}

/**
 * Clears the indexConfigs object, then calls reset with 'null' - to be called after linting finishes.
 * @param {Object} newBasis - the new options to use.
 */
inlineConfig.prototype.clear = function () {
    this.indexConfigs = [];
    this.reset(null);
}

/**
 * Apply the given cofiguration to this.current. Returns true if the operation resulted in any changes, false otherwise.
 * @param {Object} config - the new config to write onto the current options.
 */
function applyConfig(config) {
    var changed = false;
    config.rules.forEach(function (rule) {
        // for each rule in the configuration, apply it to this.current
        if (rule.type === 'rule') {
            if (!this.current[rule.name]) 
            {
                throw new Error('option ' + rule.name + ' does not exist.');   
            }
            this.current[rule.name] = rule.value;
            changed = true;
        } else if (rule.type === 'preset') {
            lodash.merge(this.current, envs.envs[rule.name]);
            changed = true;
        }
    }.bind(this))
    return changed;
}

/**
 * Get the options object to use at this index. Indices must be given in order, or an error is thrown (much speedier).
 * If you must get them out of order, use 'reset' first. Sets the opts to this.current.
 * @param {number} newIndex - The index to get opts for.
 */
inlineConfig.prototype.getOptsAtIndex = function (newIndex) {
    if (newIndex != 0 && newIndex <= index) {
        throw new Error('Cannot get options for index ' + newIndex + ' when index ' + index + ' has already been checked');
    } else {
        var configs = lodash.compact(this.indexConfigs.slice(index + 1, newIndex + 1));
        index = newIndex;
        /*
         * NOTE: right now, this only allows for a maximum of one config to be applied 
         * from one call to the next. This makes sense if we call the function on each element or 
         * even each comment. If this changes later, use a loop below.
         */
        // if there are no configs between the previous this.current and the new this.current, do nothing.
        if (!configs[0]) return false;
        return applyConfig.call(this, configs[0]); // apply that config 
    }
}

/**
 * Returns true if anything is in indexConfigs.
 */
inlineConfig.prototype.configsExist = function () {
    return this.indexConfigs.length !== [];
}

/**
 * Add the config when it was given to us from feedComment.
 * @param {Object} config - The config to add.
 */
inlineConfig.prototype.addConfig = function (config) {
    if (this.indexConfigs[config.end]) throw new Error('config exists at index already!')
    this.indexConfigs[config.end] = config;
}

/**
 * Take the comment element and check it for the proper structure. Add it to our array indexConfigs.
 * @param {number} newIndex - The index to get opts for.
 */
inlineConfig.prototype.feedComment = function (element) {
    var line = element.data;
    var match = line.match(regex.open);
    if (!match) return;
    // we know this has 'htmllint' at the beginning, now parse the attribute structure if possible

    var keyvals = knife.parseHtmlAttrs(match[1]);
    if (!keyvals) return;
    // we know this has the proper structure.

    var length = keyvals.length,
        workingPairs = [];
    for (var i = 0; i < length; i++) {
        name = keyvals[i]['name'];
        value = keyvals[i]['valueRaw'];

        if (!name || !value || !name.length || !value.length) {
            throw new Error('Inline Configuration not set up correctly at line ' + element.lineCol[0])
        };
        
        // make sure our name is valid
        var match = name.match(regex.name)
        if (!match || match[0].length !== name.length) {
            throw new Error('Name is not of proper form for an inline configuration.')
        };

        var strippedValue = value.substr(1, value.length - 2);
        // check if our value is for a preset.
        var endOfVal = strippedValue.substr(1, strippedValue.length - 1)
        if (name === preset && value[1] === '$' && envsNames.indexOf(endOfVal) > -1) {
            // This is for a preset. load up that preset.
            workingPairs.push({
                type: 'preset',
                name: endOfVal,
            })
            continue;
        }
        var parsed = null;

        // it's not a preset. try to JSON parse it.
        try {
            parsed = JSON.parse(strippedValue);
        } catch (e) {
            throw new Error("Cannot JSON parse the configuration value. " + typeof strippedValue + strippedValue)
            continue;
        }
        

        if (parsed === null || (!(typeof parsed === 'string' || parsed instanceof String) && !(typeof parsed === 'boolean' || parsed instanceof Boolean) && !(typeof parsed === 'object' || parsed instanceof Object))) {
            console.log(typeof parsed);
            throw new Error('Value not recognized in inline configuration');
        }

        // This is something to set to a rule. go for it.
        workingPairs.push({
            type: 'rule',
            name: name,
            value: parsed
        })
    }
    if (workingPairs.length < 1) return;

    var config = {
        start: element.index,
        end: element.index + element.data.length + 6, // 7 for the '<!--' and '-->', spaces were in element.data already
        rules: workingPairs //in order! 
    }
    // add it
    this.addConfig(config);
}