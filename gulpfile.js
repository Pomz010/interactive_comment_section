const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-dart-sass');
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');
const browserSync = require('browser-sync').create();


// COPY HTML
// function copyHtml(){
//     return src('./*.html').pipe(dest('./public'));
// }

// SASS FOR MINIFIED CSS
function compileScss(){
    return src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(prefix())
        .pipe(minify())
        .pipe(dest('public/css'))
}

// TERSER FOR MINIFIED JS
function jsmin(){
    return src('./src/js/**/*.js')
        .pipe(terser())
        .pipe((dest('public/js')))
}

// MINIFY FOR MINIFIED IMAGE
function optimizeImg(){
    return src('./src/img/**/*.{jpg,png,svg}')
        .pipe(imagemin([
            imagemin.mozjpeg({ quality:80, progressive:true }),
            imagemin.optipng({ optiminzationLevel:2 })
        ]))
        .pipe((dest('public/img')))
}

// CONVERT MINIFIED IMAGES TO WEBP FORMAT
function webpImage(){
    return src('public/img/**/*.{jpg,png,svg}')
        .pipe(imagewebp())
        .pipe(dest('public/img'))
}

// WATCH FOR CHANGES
function watchTask(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    // watch('./*.html', copyHtml);
    watch('src/sass/**/*.scss', compileScss).on('change', browserSync.reload);
    watch('src/js/*.js', jsmin).on('change', browserSync.reload);
    watch('src/img/**/*.{jpg,png,svg}', optimizeImg);
    watch('public/img/**/*.{jpg,png,svg}', webpImage);
    watch('./*.html').on('change', browserSync.reload);
}

// DEFAULT GULP
exports.default = series(
    // copyHtml,
    compileScss,
    jsmin,
    optimizeImg,
    webpImage,
    watchTask
)