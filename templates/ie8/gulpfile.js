const { watch, src, dest, parallel, series } = require('gulp');
const less = require('gulp-less');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');

const API_PREFIX = process.env.API_PREFIX;

function css() {
    return src('./src/less/app.less')
        .pipe(less())
        .pipe(dest('./src/css'))
}

function js() {
    return src('./src/js/index.js')
        .pipe(replace('process.env.API_PREFIX', JSON.stringify(API_PREFIX)))
        .pipe(rename('app.js'))
        .pipe(dest('./src/js'))
}

function cssMin() {
    return src('./src/css/app.css')
        .pipe(cssmin())
        .pipe(dest('./dist/css'))
}

function jsMin() {
    return src('./src/js/app.js')
        .pipe(uglify())
        .pipe(dest('./dist/js'))
}

function copyJS() {
    return src([
        './src/js/jquery.min.js',
        './src/js/es5-shim.js',
        './src/js/es5-sham.js',
        './src/js/template.js',
        './src/js/echarts.js',
        './src/js/utils.js'
    ]).pipe(dest('./dist/js'))
}

function copyImages() {
    return src('./src/images/*')
        .pipe(dest('./dist/images'))
}

function copyHTML() {
    return src('./src/index.html')
        .pipe(dest('./dist'))
}

// function copyFont() {
//     return src('./src/less/font/*')
//         .pipe(dest('./dist/css/font'))
// }

exports.dev = function() {
    css();
    js();
    watch('./src/less/**/*.less', css);
    watch('./src/js/index.js', js);
}

exports.build = series(
    css,
    js,
    parallel(cssMin, jsMin, copyJS, copyImages, copyHTML)
);