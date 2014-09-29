module.exports = {
    name: 'tag-name-lowercase',
    description: 'If set, tag names must be lowercase.'
};

module.exports.process = function (element, opts) {
    if ((/[A-Z]/).test(element.name)) {
        return {
            index: element.index,
            msg: 'tag names must be lowercase'
        };
    }
};
