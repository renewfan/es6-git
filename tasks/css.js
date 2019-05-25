//gulp包
import gulp from 'gulp';
//gulp 判断包
import gulpif from 'gulp-if';
//热更新包--文件修改后浏览器自动刷新
import livereload from 'gulp-livereload';
//命令行自动处理
import args from './until/args';

gulp.task('css',()=>{
    //打开app下所有目录文件
    return gulp.src('app/**/*.css')
        .pipe(gulp.dest('server'))
})