//gulp包
import gulp from 'gulp';
//删除包
import del from 'del';
//命令行自动处理
import args from './until/args';

gulp.task('clean',(cb)=>{
    //删除 js、页面文件
    return del(['server/public','server/views'])
})