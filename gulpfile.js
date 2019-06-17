const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const px2rem = require('gulp-px2rem-plugin');

function swallowError(error) {
    console.error(error.toString());
    this.emit('end')
}

// 编译sass
gulp.task('sass', function () {
    gulp.src('app/css/base.scss')
        .pipe(sass())
        .on('error', swallowError)
        .pipe(gulp.dest('app/css'));
});

// 刷新页面
gulp.task('reload', function () {
    return browserSync.reload();
});

// 监视文件改动并重新载入
gulp.task('serve', ['sass'], function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    });
    // 监听变化文件
    const watch_files = [
        '*.html',
        'css/**/*.css',
        'css/**/*.scss',
        'js/**/*.js',
        'plugin/**/*.js',
        'plugin/**/*.css'
    ];
    // 变化时执行的方法
    const watch_methods = ['sass', 'reload'];

    gulp.watch(watch_files, {cwd: 'app'}, watch_methods);
});
