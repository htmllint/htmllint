module.exports.isSelfClosing = function (element) {
    var openRaw = element.open;

    return openRaw[openRaw.length - 1] === '/';
};

module.exports.hasNonEmptyAttr = function(tag, attr) {
    var a = tag.attribs[attr];
    return (a && a.value && a.value.length > 0);
};
