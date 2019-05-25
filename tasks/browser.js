//gulp包
import gulp from 'gulp';
//gulp 判断包
import gulpif from 'gulp-if';
//gulp 常用工具函数集合包
import gutil from 'gulp-util';
//热更新包--文件修改后浏览器自动刷新
import livereload from 'gulp-livereload';
//命令行自动处理
import args from './until/args';

gulp.task('browser',(cb)=>{
    if(!args.watch){ 
        return cb();
    }
    //监听文件变化调用对应的处理脚本
    gulp.watch('app/**/*.js',['scripts']);
    gulp.watch('app/**/*.ejs',['pages']);
    gulp.watch('app/**/*.css',['css']);
})