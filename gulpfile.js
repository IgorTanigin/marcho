const{ src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browsersync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const nunjucksRender = require('gulp-nunjucks-render');
const del = require('del');


function browserSync() {
    browsersync.init({
        server: {
            baseDir: 'app/'
        },
        notofy: false
    });
}

function nunjucks() {
        return src('app/*.njk')
        .pipe(nunjucksRender())
        .pipe(dest('app'))
        .pipe(browsersync.stream())
}


function cleanDist() {
    return del('dist')
}

function images () {
    return src('app/images/**/*')
    .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true}),
            imagemin.mozjpeg({ quality: 75, progressive: true}),
            imagemin.optipng({ optimizationLevel: 5}),
            imagemin.svgo ({
                plugins : [
                    { removeVieWBox: true},
                    { cleanupIDs: false}
                ]
            })
        ]))
    .pipe(dest('dist/images'))
}

function styles() {
    return src('app/scss/*.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        // .pipe(concat('')) 
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browsersync.stream())
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
        'node_modules/rateyo/src/jquery.rateyo.js',
        'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browsersync.stream())
}

function build () {
    return src([
        'app/*.html',
        'app/fonts/**/*',
        'app/css/style.min.css',
        'app/js/main.min.js',
    ], {base: 'app'})
    .pipe(dest('dist'))
}


function watching() {
    // watch(['app/scss/**/*.scss'], styles);
    watch(['app/**/*.scss'], styles);
    watch(['app/*.njk'], nunjucks);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/**/*.html']).on('change', browsersync.reload);
}

exports.styles = styles;
exports.browserSync = browserSync;
exports.scripts = scripts;
exports.images = images;
exports.nunjucks = nunjucks;
exports.cleanDist = cleanDist;
exports.wotching = watching;

exports.build = series(cleanDist, images, build);
exports.default = parallel(nunjucks, styles, scripts, browserSync, watching);

// const{ src, dest, watch, parallel, series } = require('gulp');

// const scss = require('gulp-sass');
// // const sass = require('gulp-sass');
// const concat = require('gulp-concat');
// const browsersync = require('browser-sync').create();
// const uglify = require('gulp-uglify');
// const autoprefixer = require('gulp-autoprefixer');
// const imagemin = require('gulp-imagemin');
// const del = require('del');


// function browserSync() {
//     browsersync.init({
//         server: {
//             baseDir: 'app/'
//         },
//         notofy: false
//     });
// }


// function cleanDist() {
//     return del('dist')
// }

// function images () {
//     return src('app/images/**/*.*')
//     .pipe(imagemin([
//             imagemin.gifsicle({ interlaced: true}),
//             imagemin.mozjpeg({ quality: 75, progressive: true}),
//             imagemin.optipng({ optimizationLevel: 5}),
//             imagemin.svgo ({
//                 plugins : [
//                     { removeVieWBox: true},
//                     { cleanupIDs: falsse}
//                 ]
//             })
//         ]))
//     .pipe(dest('dist/images'))
// }

// function styles() {
//     return src('app/scss/style.scss')
//         .pipe(scss({outputStyle: 'compressed'}))
//         .pipe(concat('style.min.css')) 
//         .pipe(autoprefixer({
//             overrideBrowserslist: ['last 10 versions'],
//             grid: true
//         }))
//         .pipe(dest('app/css'))
//         .pipe(browsersync.stream())
// }

// function scripts() {
//     return src([
//         'node_modules/jquery/dist/jquery.js',
//         'node_modules/slick-carousel/slick/slick.js',
//         'node_modules/mixitup/dist/mixitup.js',
//         'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
//     //         'node_modules/rateyo/src/jquery.rateyo.js',
//     //         'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
//     //         'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
//         'app/js/main.js'
//     ])
//     .pipe(concat('main.min.js'))
//     .pipe(uglify())
//     .pipe(dest('app/js'))
//     .pipe(browsersync.stream())
// }


// function build () {
//     return src([
//         'app/*.html',
//         'app/fonts/**/*',
//         'app/css/style.min.css',
//         'app/js/main.min.js',
//     ], {base: 'app'})
//     .pipe(dest('dist'))
// }


// function watching() {
//     watch(['app/scss/**/*.scss'], styles);
//     watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
//     watch(['app/**/*.html']).on('change', browsersync.reload);
// }

// exports.styles = styles;
// exports.browserSync = browserSync;
// exports.scripts = scripts;
// exports.images = images;
// exports.cleanDist = cleanDist;
// exports.wotching = watching;

// exports.build = series(cleanDist, images, build);
// exports.default = parallel(styles, scripts, browserSync, watching);