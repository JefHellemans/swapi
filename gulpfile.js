var gulp = require('gulp'),
    csslint = require('gulp-csslint'),
    cssminify = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    jsstylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    less = require('gulp-less');

gulp.task('watch', function() {

    gulp.watch('./app/styles/**/*.less', ['css-build']);
    gulp.watch('./app/scripts/**/*.js', ['js-build']);

});

gulp.task('js-build', function() {

    gulp.src('./app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jsstylish))
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/dist/js'))
        .pipe(notify({message: 'js built'}));

});

gulp.task('css-build', function() {

    gulp.src('./app/styles/main.less')
        .pipe(less())
        /*.pipe(csslint({
            'ids': false
        }))
        .pipe(csslint.reporter('junit-xml'))
        .pipe(csslint.reporter('fail'))*/
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.css'))
        .pipe(cssminify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/dist/css'))
        .pipe(notify({message: 'css built'}));

});