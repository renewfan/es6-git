//gulp包
import gulp from 'gulp';
//gulp 判断包
import gulpif from 'gulp-if';
//启动服务器的包
import liveserver from 'gulp-live-server';
//命令行自动处理
import args from './until/args';

gulp.task('server',(cb)=>{
    //不监听
    if(!args.watch) return cb();

    //监听状态，创建服务器
    var server=liveserver.new(['--harmony','server/bin/www']); 
    //启动服务器
    server.start()
    //监听 server 目录 js/ejs 文件变化
    gulp.watch(
        ['server/public/**/*.js','server/views/**/*.ejs'],function(file){
            //监听到变化通知服务器处理
            server.notify.apply(server,[file]);
        }
    )
    //监听需要重启服务的文件
    gulp.watch(
        ['server/routes/**/*.js','server/app.js'],function(){
            server.start.bind(server)();
        }
    )
})