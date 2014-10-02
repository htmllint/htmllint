module.exports = {
    name: 'tag-name-lowercase',
    description: 'If set, tag names must be lowercase.'
};

module.exports.process = function (element, opts) {
    if (!opts[this.name]) {
        return null;
    }

    if ((/[A-Z]/).test(element.name)) {
        console.log(element);
        return {
            index: element.index,
            msg: 'tag names must be lowercase'
        };
    }

    return null;
};
