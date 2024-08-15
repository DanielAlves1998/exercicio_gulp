const gulp = require('gulp'); //o primeiro gup popderia ser qualquer nome 
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps'); //todos os const são importações
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images/images'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })) //isso tambem é uma função. só é possivel chamar uma finção depois do gulp.src se usar o PIPE
        .pipe(sourcemaps.write('./maps')) // aqui é para criar uma arquivo de compilamento
        .pipe(gulp.dest('./build/styles'));
}

exports.default = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass)); //serve para que o programa rode sem parar
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/images*', {ignoreInitial: false}, gulp.series(comprimeImagens));
}