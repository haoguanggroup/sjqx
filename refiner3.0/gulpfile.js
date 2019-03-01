const gulp = require("gulp");
const less = require("gulp-less");
const sourcemap = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel")
 const concat = require("gulp-concat");
 const browserSync = require("browser-sync").create();
// const clean = require("gulp-clean");
// const miniCss = require("gulp-minify-css");
// const rename = require("gulp-rename");
// const uglify = require("gulp-uglify");

gulp.task("default",['less','watchLess','babel','watchJS','http'],function(){
    console.log("初始化任务...");
})

//创建一个处理css样式任务
gulp.task("less",function(){
    gulp.src("./src/style/less/*.less")
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(autoprefixer({
        browsers:"last 3 version"
    }))
    .pipe(sourcemap.write())
    .pipe(gulp.dest('./dist/css/')) 
})
//监听less
gulp.task("watchLess",function(){
    gulp.watch("./src/style/**/*.less",['less']);
})
//es6转es5
gulp.task("babel",function(){
    gulp.src("./src/script/*.js")
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/js/build'))
})
//监听JS
gulp.task("watchJS",function(){
    gulp.watch("./src/script/*.js",['babel']);
});
//开启服务器
gulp.task('http',function(){
    browserSync.init({
        server:'./'
    })
    console.log('服务器已经开启，请访问： http://localhost:8080');
    browserSync.watch("./*").on("change",browserSync.reload);
})
