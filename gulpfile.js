var gulp = require('gulp');
var path = require('path');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var foreach = require('gulp-foreach');
var rename = require("gulp-rename");
var stylus = require('gulp-stylus');
var buffer = require('vinyl-buffer');
var nib = require('nib');
var gulpTypescript = require('gulp-typescript');
var typescript = require('typescript');
var sourcemaps = require('gulp-sourcemaps');
var header = require('gulp-header');
var merge = require('merge2');
var pkg = require('./package.json');
var tsd = require('gulp-tsd');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var replace = require('gulp-replace');
var gulpIf = require('gulp-if');

var jasmine = require('gulp-jasmine');

var bundleTemplate = '// <%= pkg.name %> v<%= pkg.version %>\n';

var headerTemplate = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');

var dtsHeaderTemplate =
    '// Type definitions for <%= pkg.name %> v<%= pkg.version %>\n' +
    '// Project: <%= pkg.homepage %>\n' +
    '// Definitions by: Niall Crosby <https://github.com/ceolter/>\n';

gulp.task('default', ['webpack-all']);
gulp.task('release', ['webpack-all']);

gulp.task('webpack-all', ['webpack','webpack-minify','webpack-noStyle','webpack-minify-noStyle'], tscTask);

gulp.task('webpack-minify-noStyle', ['tsc','stylus'], webpackTask.bind(null, true, false));
gulp.task('webpack-noStyle', ['tsc','stylus'], webpackTask.bind(null, false, false));
gulp.task('webpack-minify', ['tsc','stylus'], webpackTask.bind(null, true, true));
gulp.task('webpack', ['tsc','stylus'], webpackTask.bind(null, false, true));

gulp.task('stylus-watch', ['stylus-no-clean'], stylusWatch);
gulp.task('stylus-no-clean', stylusTask);

gulp.task('tsc', ['tsc-src'], tscExportsTask);
gulp.task('tsc-src', ['cleanDist'], tscTask);
gulp.task('tsc-exports', ['cleanExports'], tscExportsTask);
gulp.task('stylus', ['cleanDist'], stylusTask);

gulp.task('cleanDist', cleanDist);
gulp.task('cleanExports', cleanExports);

function stylusWatch() {
    gulp.watch('./src/styles/!**/!*', ['stylus-no-clean']);
}

function cleanDist() {
    return gulp
        .src('dist', {read: false})
        .pipe(clean());
}

function cleanExports() {
    return gulp
        .src(['./main.d.ts','main.js'], {read: false})
        .pipe(clean());
}

function tscTask() {
    var project = gulpTypescript.createProject('./tsconfig.json', {typescript: typescript});

    var tsResult = gulp
        .src('src/ts/**/*.ts')
        .pipe(gulpTypescript(project));

    return merge([
        tsResult.dts
            .pipe(header(dtsHeaderTemplate, { pkg : pkg }))
            .pipe(gulp.dest('dist/lib')),
        tsResult.js
            .pipe(header(headerTemplate, { pkg : pkg }))
            .pipe(gulp.dest('dist/lib'))
    ])
}

function tscExportsTask() {
    var project = gulpTypescript.createProject('./tsconfig-exports.json', {typescript: typescript});

    var tsResult = gulp
        .src('./exports.ts')
        .pipe(gulpTypescript(project));

    return merge([
        tsResult.dts
            .pipe(header(dtsHeaderTemplate, { pkg : pkg }))
            .pipe(rename("main.d.ts"))
            .pipe(gulp.dest('./')),
        tsResult.js
            .pipe(header(headerTemplate, { pkg : pkg }))
            .pipe(rename("main.js"))
            .pipe(gulp.dest('./'))
    ])
}

function webpackTask(minify, styles) {

    var plugins = [];
    if (minify) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));
    }
    var mainFile = styles ? './main-with-styles.js' : './main.js';

    var fileName = 'ajuro-ui';
    fileName += minify ? '.min' : '';
    fileName += styles ? '' : '.noStyle';
    fileName += '.js';

    return gulp.src('src/entry.js')
        .pipe(webpackStream({
            entry: {
                main: mainFile
            },
            output: {
                path: path.join(__dirname, "dist"),
                filename: fileName,
                library: ["ajuroUI"],
                libraryTarget: "umd"
            },
            //devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.css$/, loader: "style-loader!css-loader" }
                ]
            },
            plugins: plugins
        }))
        .pipe(header(bundleTemplate, { pkg : pkg }))
        .pipe(gulp.dest('./dist/'));
}

function stylusTask() {
    // Uncompressed
    gulp.src(['src/styles/*.styl', '!src/styles/theme-common.styl'])
        .pipe(stylus({
            use: nib(),
            compress: false
        }))
        .pipe(gulp.dest('dist/styles'));
}

