var gulp = require('gulp'),
    coveralls = require('gulp-coveralls'),
    eslint = require('gulp-eslint'),
    jscs = require('gulp-jscs'),
    istanbul = require('gulp-istanbul'),
    mocha = require('gulp-mocha');

var paths = {
    src: ['./lib/**/*.js'],
    test: './test/*.js'
};

gulp.task('jscs', function () {
    gulp.src(paths.src
             .concat(paths.test))
        .pipe(jscs());
});

// lints javascript files with eslint
// edit .eslintrc for configuration
gulp.task('lint', ['jscs'], function () {
    return gulp.src(paths.src
             .concat(paths.test)
             .concat('./gulpfile.js'))
        .pipe(eslint())
        .pipe(eslint.format());
});

// instruments js source code for coverage reporting
gulp.task('istanbul', function (done) {
    gulp.src(paths.src)
        .pipe(istanbul())
        .on('finish', done);
});

// runs mocha tests
gulp.task('test', ['istanbul'], function (done) {
    // expose globals here for now
    // move these into their own file if they grow
    global.chai = require('chai');
    global.expect = global.chai.expect;

    gulp.src(paths.test, {read:false})
        .pipe(mocha({
            reporter: 'list'
        }))
        .pipe(istanbul.writeReports())
        .on('end', done);
});

// plato report
// TODO: think bout this a bit more
gulp.task('plato', function () {
    var plato = require('gulp-plato');
    gulp.src(paths.src)
        .pipe(plato('report', {}));
});

// runs on travis ci (lints, tests, and uploads to coveralls)
gulp.task('travis', ['lint', 'test'], function () {
    gulp.src('coverage/**/lcov.info')
        .pipe(coveralls());
});

gulp.task('default', [
    'lint',
    'test'
]);
