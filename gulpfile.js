let gulp = require('gulp');
let sass = require('gulp-sass');

//编译sass文件
gulp.task('compileSass',function(){
    //设置任务路径
    gulp.src('./src/sass/*.scss')

    //sass->css
    .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))

    //输出文件路径
    .pipe(gulp.dest('./src/css'))
})

//监听文件，自动执行编译任务
gulp.task('detection',function(){
    gulp.watch('./src/sass/*.scss',['compileSass'])
});

//自动刷新服务器
let browserSync = require('browser-sync');

// 静态服务器
gulp.task('server',function(){
    browserSync({
        // 服务器路径
        server:'./src/',

        // 代理服务器
        // proxy:'http://localhost:1802',

        // 端口
        // port:666,

        //监听文件，自动刷新服务器
        files:['./src/**/*.html','./src/css/*.css']
    });

    // 监听sass文件修改，并自动编译
    gulp.watch('./src/sass/*.scss',['compileSass']);
})