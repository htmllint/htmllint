module.exports = {
    getFormatTest: function(name) {
        function test(reg) { return function(s) { return reg.test(s); }; }
        var verifyFormat = {
            lowercase:  test(/^[a-z][a-z\d]*$/),
            underscore: test(/^[a-z][a-z\d]*(_[a-z][a-z\d]*)*$/),
            dash:       test(/^[a-z][a-z\d]*(-[a-z][a-z\d]*)*$/),
            camel:      test(/^[a-zA-Z][a-zA-Z\d]*$/)
        };
        return verifyFormat[name];
    }
};
