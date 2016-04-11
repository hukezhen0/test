var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    /*spritesmith = require('gulp.spritesmith'),
	config      = require('../../config').sprites,*/
    del = require('del');
    
//sass编译 添加前缀 保存到目录下 压缩 添加.min在输出压缩文件到指定目录，最后提示任务完成
gulp.task('styles', function() {
    return sass('src/sass/common/*.scss', { style: 'compact' })
        .pipe(autoprefixer('last 2 version'))
        //.pipe(concat('common.css'))
        .pipe(gulp.dest('dist/css/common'))
        /* .pipe(rename({suffix: '.min'}))
         .pipe(minifyCss())*/
        //.pipe(gulp.dest('dist/css/h5'))
        .pipe(notify({ message: '您的sass旨意已完成' }));
});

//压缩图片
gulp.task('images', function() {
  return gulp.src('src/images/pc/*')
      .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
      //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(gulp.dest('dist/images/pc'))
      .pipe(notify({ message: '您的图片压缩旨意已完成' }));
});

//在任务执行前，最好先清除之前生成的文件
gulp.task('clean', function(cb) {
    del(['dist/css', 'dist/images'], cb)
});



//我们在命令行下输入 gulp执行的就是默认任务，现在我们为默认任务指定执行上面写好的2个任务
gulp.task('default', ['clean'],function() {
    gulp.start('styles','images');
});

//监听文件的是否修改以便执行相应的任务
gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('src/sass/common/*.scss', ['styles']);
 // Watch image files
  gulp.watch('src/images/**/*', ['images']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});



