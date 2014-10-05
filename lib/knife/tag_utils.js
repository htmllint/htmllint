module.exports.isSelfClosing = function (element) {
    var openRaw = element.open;

    return openRaw[openRaw.length - 1] === '/';
};
