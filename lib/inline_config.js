var knife = require('./knife'),
    lodash = require('lodash'),
    presets = require('./presets');

// Private vars,
var index = 0, // index used for making sure configs are sent in order
    basis = null; // a copy of the original options given to us, for a reset.

/**
 * An inline configuration class is created to hold each inline configuration
 * and report back what the options should be at a certain index.
 * @constructor
 * @param {Object} config - an option parser
 * If not given here, it must be set with inlineConfig.reset(basis).
 */
var inlineConfig = function (config) {
    this.indexConfigs = [];
    this.previous = {};
    this.setOption = config.setOption.bind(config);
};
module.exports = inlineConfig;

// regexes used for parsing the configuration comment.
var regex = {
    open: /[\s]*htmllint[\s]+(.*)/, // strip out the 'htmllint'
    name: /^[a-zA-Z0-9-_]+$/ // checks for a valid name
};

/**
 * Reset the current opts to the basis. if newBasis is supplied, use that as our new basis.
 * @param {Object} newBasis - the new options to use.
 */
inlineConfig.prototype.reset = function (newBasis) {
    basis = newBasis ? lodash.cloneDeep(newBasis) : basis;
    this.current = lodash.cloneDeep(basis);
    index = 0;
};

/**
 * Clears the indexConfigs object, then calls reset with 'null' - to be called after linting finishes.
 * @param {Object} newBasis - the new options to use.
 */
inlineConfig.prototype.clear = function () {
    this.indexConfigs = [];
    this.reset(null);
};

/**
 * Apply the given cofiguration to this.current. Returns true if the operation resulted in any changes, false otherwise.
 * @param {Object} config - the new config to write onto the current options.
 */
function applyConfig(config) {
    var setOption = function(name, value, noprocess) {
        this.previous[name] = this.current[name];
        this.current[name] = this.setOption(name, value, noprocess);
    }.bind(this);

    config.rules.forEach(function (rule) {
        // for each rule in the configuration, apply it to this.current
        if (rule.type === 'rule') {
            if (!(rule.name in this.current)) {
                throw new Error('option ' + rule.name + ' does not exist.');
            } else {
                var isprev = (rule.value === '$previous');
                setOption(
                    rule.name,
                    isprev ? this.previous[rule.name] : rule.value,
                    isprev
                );
            }
        /* istanbul ignore else */
        } else if (rule.type === 'preset') {
            var preset = presets.presets[rule.name];
            Object.keys(preset).forEach(function(name) {
                setOption(name, preset[name]);
            });
        }
    }.bind(this));
}

/**
 * Get the options object to use at this index. Indices must be given in order, or an error is thrown (much speedier).
 * If you must get them out of order, use 'reset' first. Sets the opts to this.current.
 * @param {number} newIndex - The index to get opts for.
 */
inlineConfig.prototype.getOptsAtIndex = function (newIndex) {
    if (newIndex !== 0 && newIndex <= index) {
        throw new Error('Cannot get options for index ' + newIndex + ' when index ' + index + ' has already been checked');
    } else {
        lodash.compact(this.indexConfigs.slice(index + 1, newIndex + 1))
            .forEach(applyConfig, this);
        index = newIndex;
    }
};

/**
 * Add the config when it was given to us from feedComment.
 * @param {Object} config - The config to add.
 */
inlineConfig.prototype.addConfig = function (config) {
    if (this.indexConfigs[config.end]) {
        throw new Error('config exists at index already!');
    }

    this.indexConfigs[config.end] = config;
};

/**
 * Take the comment element and check it for the proper structure. Add it to our array indexConfigs.
 * @param {number} newIndex - The index to get opts for.
 */
inlineConfig.prototype.feedComment = function (element) {
    var line = element.data,
        match = line.match(regex.open);

    if (!match) {
        return;
    }
    // we know this has 'htmllint' at the beginning, now parse the attribute structure if possible

    var keyvals = knife.parseHtmlAttrs(match[1]);

    var length = keyvals.length,
        workingPairs = [];

    for (var i = 0; i < length; i++) {
        var r = parsePair(keyvals[i].name, keyvals[i].valueRaw);
        if ((typeof r) === 'string') {
            throw new Error(r);
        } else {
            workingPairs.push(r);
        }
    }
    if (workingPairs.length < 1) {
        return;
    }

    var config = {
        start: element.index,
        end: element.index + element.data.length + 6, // 7 for the '<!--' and '-->', spaces were in element.data already
        rules: workingPairs //in order!
    };
    // add it
    this.addConfig(config);
};

/**
 * Accept an attribute and return either a parsed config pair object
 * or an error string.
 * @param {string} name - The attribute name.
 * @param {string} value - The attribute raw value.
 */
function parsePair(name, value) {
    if (!name || !value || !name.length || !value.length) {
        return 'Invalid configuration';
    }

    if (!regex.name.test(name)) {
        return 'Invalid rule or preset name: ' + name;
    }

    // Strip quotes and replace single quotes with double quotes
    var squote = "'", dquote = '"'; // Single and double quote, for sanity
    if (value[0] === squote  ||  value[0] === dquote) {
        value = value.substr(1, value.length - 2);
    }
    value = value.replace(/\'/g, dquote);

    // Treat _ and - interchangeably
    name = name.replace(/_/g, '-');

    // check if our value is for a preset.
    if (name === 'preset') {
        if (!presets.presets[value]) {
            return 'Not a preset: ' + value;
        } else {
            return { type: 'preset', name: value };
        }
    }

    // it's not a preset.
    var parsed = null;
    if (value === '$previous') {
        parsed = '$previous';
    } else if (value[0] === '$') {
        var vs = value.substr(1);
        if (!presets.presets[vs]) {
            return 'Not a preset: ' + vs;
        }
        parsed = presets.presets[vs][name];
    } else {
        try {
            parsed = JSON.parse(value);
        } catch (e) {
            if (!regex.name.test(value)) {
                return 'Value not recognized in inline configuration';
            }
            parsed = value;
        }
    }

    return { type: 'rule', name: name, value: parsed };
}
