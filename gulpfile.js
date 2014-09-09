var gulp = require('gulp'),
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

// runs mocha tests
gulp.task('test', function (done) {
    gulp.src(paths.src)
        .pipe(istanbul())
        .on('finish', function () {
            gulp.src(paths.test)
                .pipe(mocha({
                    reporter: 'nyan'
                }))
                .pipe(istanbul.writeReports())
                .on('end', done);
        });
});

gulp.task('default', [
    'lint',
    'test'
]);
