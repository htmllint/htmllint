module.exports = {
    name: 'id-class-ad-disabled',
    description: 'If set, ids and classes may not use the word "ad".',
    default: true
};

module.exports.process = function (element, opts) {
    var enabled = opts['id-class-ad-disabled'];
    if (!enabled) {
        return [];
    }

    function test(s) {
        return /(^|[^a-zA-Z0-9])ad([^a-zA-Z0-9]|$)/.test(s);
    }
    var a = element.attribs;
    if ('id' in a && test(a.id) || 'class' in a && test(a.class)) {
        return {
            index: element.index,
            msg: 'ids and classes may not use the word "ad"'
        };
    }
};
