/*
 * Development Enviroment Commands
 * 
 * For standard dev workflow run:- 
 * 
 * gulp
 * 
 * or
 * 
 * gulp watch
 * 
 * ---------------------------------------------------------------------------------------------------
 * 
 * For publishing project run:- 
 * 
 * gulp clean
 * gulp build
 * gulp minify
 *
 */

// Dependencies injection
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    fileinclude = require('gulp-file-include'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    minifyhtml = require('gulp-minify-html');
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');


// Default task (run:   gulp)
gulp.task('default', function() {
    gulp.start('less','scripts','app','template','watch');
});

// Build task (run:   gulp build)
gulp.task('build', function() {
    gulp.start('less','scripts','app','template','copy');
});

// Clean (run:   gulp clean)
gulp.task('clean', function() {
    gulp.src('html_public/')
    .pipe(clean())
    .pipe(notify({ message: 'html_public is Clean!' }));
});

// minify  (run:   gulp minify)
gulp.task('minify', function() {
    // Minify .html
    gulp.src('html_public/*.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest('html_public/'))
    .pipe(notify({ message: 'html minified!' }));
    // Minify .js
    gulp.src('html_public/scripts/site.js')
    .pipe(uglify())
    .pipe(gulp.dest('html_public/scripts/'))
    .pipe(notify({ message: 'js minified!' }));
});

// Watch  (run:   gulp watch)
// NOTE:- does not watch for deleted files&folders throws error and terminates watch
gulp.task('watch', function() {
  // Watch .less files
  gulp.watch(['html_source/css/less/**/*'], ['less']);
  // Watch .js files
  gulp.watch([
      'html_source/scripts/**/*',
      '!html_source/scripts/app.js',
      '!html_source/scripts/site.js'
  ], ['scripts','app']);
  // Watch template files
  gulp.watch(['html_source/templating/**/*.html'], ['template']);
});

// Copy (run:   gulp copy)
gulp.task('copy', function() {
    gulp.src([
        'html_source/**/*',
        '!html_source/css/less/',
        '!html_source/css/less/**',
        '!html_source/scripts/app/',
        '!html_source/scripts/app/**',
        '!html_source/scripts/init/',
        '!html_source/scripts/init/**',
        '!html_source/scripts/plugins/',
        '!html_source/scripts/plugins/**',
        '!html_source/templating/*.html',
        '!html_source/templating/content-pieces/',
        '!html_source/templating/content-pieces/**',
        '!html_source/templating/page-pieces/',
        '!html_source/templating/page-pieces/**'
    ])
    .pipe(gulp.dest('html_public/'));
    
    gulp.src('html_source/scripts/plugins/ignore-plugins/*')
    .pipe(gulp.dest('html_public/scripts/plugins/ignore-plugins/'));
});

// Less  (run:   gulp less)
gulp.task('less', function() {
    gulp.src('html_source/css/less/compile-site.less')
    .pipe(less())
    .pipe(rename("site.css"))
    .pipe(minifycss())
    .pipe(gulp.dest('html_source/css'))
    .pipe(notify({ message: 'Less has compiled!' }));
});

// Scripts (run:   gulp scripts)
gulp.task('scripts', function() {
    gulp.src([
        'html_source/scripts/plugins/**/*.js',
        '!html_source/scripts/plugins/ignore-plugins/**/*.js',
        'html_source/scripts/init/*.js'
    ])
    .pipe(concat('site.js'))
    .pipe(gulp.dest('html_source/scripts'))
    .pipe(notify({ message: 'Scripts has compiled!' }));
});

// Scripts (run:   gulp app)
gulp.task('app', function() {
    gulp.src([
        'html_source/scripts/app/ng-app.js',
        'html_source/scripts/app/routes/*.js',
        'html_source/scripts/app/services/*.js',
        'html_source/scripts/app/filters/*.js',
        'html_source/scripts/app/directives/**/*.js',
        'html_source/scripts/app/controllers/*.js',
        'html_source/scripts/app/modules/*.js'// do we need to cater for multiple apps??
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('html_source/scripts'))
    .pipe(notify({ message: 'App has compiled!' }));
});

// Template (run:   gulp template)
gulp.task('template', function() {
    gulp.src(['html_source/templating/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('html_source/'))
    .pipe(notify({ message: 'Page Built!' }));
});