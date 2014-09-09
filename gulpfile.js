var gulp = require('gulp'),
    coveralls = require('gulp-coveralls'),
    jshint = require('gulp-jshint'),
    istanbul = require('gulp-istanbul'),
    mocha = require('gulp-mocha');

var paths = {
    src: ['./lib/**/*.js'],
    test: './test/*.js'
};

// lints javascript files with jshint
// edit .jshintrc for configuration
gulp.task('lint', function () {
    return gulp.src(paths.src)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// instruments js source code for coverage reporting
gulp.task('istanbul', function (done) {
    gulp.src(paths.src)
        .pipe(istanbul())
        .on('finish', done);
});

// runs mocha tests
gulp.task('test', ['istanbul'], function (done) {
    gulp.src(paths.test)
        .pipe(mocha({
            reporter: 'list'
        }))
        .pipe(istanbul.writeReports())
        .on('end', done);
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
