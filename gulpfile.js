const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function compressImg() {
    return gulp.src('./source/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img'));
}

function compressJs() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
}

function compileSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

exports.default = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compileSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(compressJs));
    gulp.watch('./source/img/*', {ignoreInitial: false}, gulp.series(compressImg));
}

// function funcaoPadrao(callback) {
//     setTimeout(function() {
//         console.log("Executando com gulp.");
//         callback();
//     }, 2000);
// }

// function hello(callback) {
//     console.log("Hello World!");
//     bye();
//     callback();
// }

// function bye() {
//     console.log("Bye World!");
// }

// //Em série
// //exports.default = gulp.series(funcaoPadrao, hello);

// //Em paralelo
// exports.default = gulp.parallel(funcaoPadrao, hello);