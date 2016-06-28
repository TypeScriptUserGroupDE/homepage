var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var Builder = require('systemjs-builder');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var Config = require('./gulp.config');
var config = new Config();
var tscConfig = require('./tsconfig.json');

var typingFiles = [
    'typings/browser.d.ts'
];

gulp.task('fonts', function () {
    return gulp
        .src(config.fonts.in)
        .pipe(gulp.dest(config.fonts.out));
});

gulp.task('sass', ['fonts'], function () {
    return gulp.src([
        config.sass.in
        // './node_modules/bootstrap-sass/assets/stylesheets/bootstrap/**/_*.scss'
    ])
        .pipe(sass(config.sass.sassOpts))
        .pipe(gulp.dest(config.sass.out))
        .pipe(browserSync.stream());
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', function () {
    return gulp.src(['src/**/*', '!src/**/*.ts'])
        .pipe(gulp.dest(config.build.path))
});

gulp.task('copy:index', function () {
    return gulp.src(['src/index.html', './systemjs.config.js'])
        .pipe(gulp.dest(config.build.path))
});

/// copy dependencies
gulp.task('build:libs', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/es6-promise/dist/es6-promise.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',

        'system.config.js'
    ])
    // .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        // .pipe(uglify())
        // .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest(config.build.vendor))
});

gulp.task('copy:libs', function () {
    gulp.src([
        'node_modules/angular2-jwt/angular2-jwt.js'
    ])
        .pipe(gulp.dest(config.build.vendor + 'angular2-jwt'));

    gulp.src([
        'node_modules/angular2-google-maps/**/*'
    ])
        .pipe(gulp.dest(config.build.vendor + 'angular2-google-maps'));

    gulp.src([
        'node_modules/rxjs/**/*'
    ])
        .pipe(gulp.dest(config.build.vendor + 'rxjs'));

    return gulp.src([
        'node_modules/@angular/**/*'
    ])
        .pipe(gulp.dest(config.build.vendor + '@angular'));
});

// TypeScript compile
gulp.task('compile', function () {
    var tsResult = gulp.src('src/**/*.ts')
        // .pipe(sourcemaps.init())
        .pipe(ts(tscConfig.compilerOptions));
    return tsResult.js
        // .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.build.path));
});

gulp.task('bundle', function () {
    // todo: delete not needed stuff in target/lib after build

    var builder = new Builder('target', './systemjs.config.js');
    builder.buildStatic('app', 'target/app.js')
        .then(function () {
            browserSync.reload();
        });
});

gulp.task('clean', function () {
    return del([config.build.path]);
});

gulp.task('serve', ['build'], function () {
    browserSync.init(config.browserSync.dev);
    gulp.watch([config.sass.watch], ['sass']);
    gulp.watch(['src/**/*.ts'], ['updateBundle']);
    gulp.watch(['src/**/*', '!src/**/*.ts'], ['copy:assets']).on('change', reload);
    // todo: unneeded?
    gulp.watch(['src/index.html'], ['copy:index']).on('change', reload);
});

gulp.task('build', function (cb) {
    runSequence('clean', ['compile', 'build:libs', 'copy:libs', 'copy:assets', 'sass'], 'bundle', cb);
});

gulp.task('updateBundle', function (cb) {
    runSequence('compile', 'bundle', cb);
});

gulp.task('default', ['serve']);