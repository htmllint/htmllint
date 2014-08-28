var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha');

var paths = {
    src: [
        './index.js',
        './lib/**/*.js'
    ],
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
gulp.task('test', function () {
    return gulp.src(paths.test)
        .pipe(mocha({
            reporter: 'nyan'
        }));
});

gulp.task('default', [
    'lint',
    'test'
]);
