const { watch, src, dest, parallel } = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const jsmin = require('gulp-jsmin');
const replace = require('gulp-replace');

/**build-start**/
function copyHtml() {
    return src('./src/index.html')
        .pipe(replace(/<!--replacestart-->(.*)<!--replaceend-->/, '<script src="./js/app.js"></script>'))
        .pipe(dest('./dist'))
}

function copyImages() {
     return src('./src/images/*')
        .pipe(dest('dist/images'));
}

function miniCss() {
    return src('./src/css/index.css')
        .pipe(cssmin())
        .pipe(dest('./dist/css'));
}

function minJS() {
    return src(['./src/js/json.js', './src/js/utils.js', './src/js/ajaxOnline.js', './src/js/index.js'])
        .pipe(concat('app.js'))
        .pipe(jsmin())
        .pipe(dest('./dist/js'));
}
/**build-end**/

/**dev-start**/
function css() {
    return src('./src/less/index.less')
        .pipe(less())
        .pipe(dest('./src/css'))
}
function js() {
    return src(['./src/js/json.js', './src/js/utils.js', './src/js/ajax.js', './src/js/index.js'])
        .pipe(concat('app.js'))
        .pipe(dest('./src/js'));
}
/**dev-end**/

exports.build = parallel(miniCss, copyImages, copyHtml, minJS);

exports.default = function() {
    watch('./src/less/**/*.less', css);
}