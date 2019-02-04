'use strict';
 
const gulp = require('gulp'),
    pump = require('pump'),
    del = require('del'),
    merge = require('merge-stream'),
    autoprefixer = require('autoprefixer'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

const
    src_folders = ['./css/**/*.scss'],

    dest_folders = ['./css'],

    watch_folders = ['./css/**/*.scss'];

gulp.task('sass', () => {

    let tasks = src_folders.map(function(element, index){

        return gulp.src(element)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass().on('error', plugins.sass.logError))
            .pipe(plugins.sourcemaps.write())
            .pipe(plugins.postcss([autoprefixer()]))
            .pipe(gulp.dest(dest_folders[index]));
        });
    
    return merge(tasks);
});

gulp.task('autoprefixer', () => {

    let tasks = dest_folders.map(function(element, index){

        return gulp.src(element)
            .pipe(plugins.postcss([autoprefixer()]))
            .pipe(gulp.dest(dest_folders[index]));
        });
    
    return merge(tasks);
});

gulp.task('watch_files', () => {
    
    let tasks = watch_folders.map(function(element){
        gulp.watch(element, gulp.series('sass'));
    });

    return tasks;
});

gulp.task('watch', gulp.series('sass', 'watch_files'));

gulp.task('default', gulp.series('watch'));
