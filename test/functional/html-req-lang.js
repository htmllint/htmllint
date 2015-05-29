module.exports = [
    {
        desc: 'should pass when set to false',
        input: '<!DOCTYPE html>\n<html></html>',
        opts: { 'html-req-lang': false },
        output: 0
    }, {
        desc: 'should pass html with lang',
        input: '<!DOCTYPE html>\n<html lang="en"></html>',
        opts: { 'html-req-lang': true },
        output: 0
    }, {
        desc: 'should fail on html with no lang',
        input: '<!DOCTYPE html>\n<html></html>',
        opts: { 'html-req-lang': true },
        output: 1
    }
];
