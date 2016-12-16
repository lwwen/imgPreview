var gulp = require('gulp'),
    minify=require('gulp-minify-css');
gulp.task('script', function() {
    return gulp.src('dist/css/*.css')      //压缩的文件
    .pipe(minify())
        .pipe(gulp.dest('dist/min/'))   //输出文件夹
});