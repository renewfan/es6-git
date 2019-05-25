//gulp包
import gulp from 'gulp';
//脚本关联、运行顺序处理包
import gulpSequence from 'gulp-sequence';

/** 
 * 1、删除server中模板文件及公共文件 
 * 2、拷贝css文件 
 * 3、编译模板文件 
 * 4、执行脚本
 * 4.1、脚本执行顺序 浏览器-->服务器
 * */
gulp.task('build',gulpSequence('clean','css','pages','scripts',['browser','server']));