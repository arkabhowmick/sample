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
const htmlmin = require('gulp-htmlmin');
var svgmin = require('gulp-svgmin');
var minifyInline = require('gulp-minify-inline');
const inlineCss = require('gulp-inline-css');

sass.compiler = require('node-sass');

// start server
gulp.task('serve', serve({
    host: '0.0.0.0',
    root: ['docs'],
    port: 4000
}));

//Sass to Css
gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(gulp.dest('src/css'));
        // .pipe(concat('main.css'))
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions'],
        //     cascade: false
        // }))
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        // .pipe(gulp.dest('docs/css'));
});

gulp.task('css', () => {
    return gulp.src('src/css/*.css')
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
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(minifyInline())
        .pipe(gulp.dest('docs'));
});

//copy images 
gulp.task('images', () => {
    return gulp.src('src/img/*.png')
        .pipe(gulp.dest('docs/img'));
});

//copy svg 
gulp.task('svg', () => {
    return gulp.src('src/img/*.svg')
        // .pipe(svgmin())
        // .pipe(uglify())
        .pipe(htmlmin({ collapseWhitespace: true }))
        // .pipe(minifyInline())
        // .pipe(inlineCss())
        .pipe(gulp.dest('docs/img'));
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
    gulp.watch('src/img/*.png', gulp.series('images'));
    gulp.watch('src/img/*.svg', gulp.series('svg'));
    gulp.watch('src/css/*.css', gulp.series('css'));
});

// define the default task and add the watch task to it
// gulp.task('default', ['watch']);
gulp.task('default', gulp.parallel('serve', 'watch'));

