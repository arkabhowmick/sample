'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const jshint = require('gulp-jshint');
const serve = require('gulp-serve');

sass.compiler = require('node-sass');

// start server
gulp.task('serve', serve({
    root: ['docs'],
    port: 4000
}));

//Sass to Css
gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('docs/css'));
});
 
//copy html
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('docs'));
});

//scripts
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')         //source folder
        .pipe(jshint())             //js hint
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(concat('main.js'))    //concat all js files
        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(uglify())             //minify the js files
        .pipe(gulp.dest('docs/js'));//destination folder
});



gulp.task('watch', () => {
    gulp.watch('src/js/*.js', gulp.series('scripts'));     //js hint , concat and minify all js into main.js 
    gulp.watch('src/*.html', gulp.series('html'));         //copy html to docs
    gulp.watch('src/sass/**/*.scss', gulp.series('sass'));   // sass to css
});

// define the default task and add the watch task to it
// gulp.task('default', ['watch']);
gulp.task('default', gulp.parallel('serve', 'watch'));

