//gulp包
import gulp from 'gulp';
//gulp 判断包
import gulpif from 'gulp-if';
//gulp 处理文件拼接包
import concat from 'gulp-concat';
//webpack 包
import webpack from 'webpack';
//webpack-stream 包
import gulpwebpack from 'webpack-stream';
//文件重命名做标记
import named from 'vinyl-named';
//热更新包--文件修改后浏览器自动刷新
import livereload from 'gulp-livereload';
//处理文件信息流
import plumber from 'gulp-plumber';
//文件重命名
import rename from 'gulp-rename';
//js\css文件压缩
import uglify from 'gulp-uglify';
//命令行输出处理
import {log,colors} from 'gulp-util';
//命令行自动处理
import args from './until/args';
import { Stats } from 'fs';

//创建脚本编译任务
gulp.task('scripts',()=>{
    //打开文件
    return gulp.src(['app/js/index.js'])
        //处理常规错误逻辑
        .pipe(plumber({
            errorHandler:function(){

            }
        }))
        //文件重命名
        .pipe(named())
        //js编译
        .pipe(gulpwebpack({
            module:{
                //遇到js文件让 babel 处理
                rules:[{
                    test:/\.js$/,
                    loader:'babel-loader'
                }]
            }
        }),null,(err,stats)=>{
            log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
                chunks:false
            }))
        })
        //编译后重新存放
        .pipe(gulp.dest('server/public/js'))
        //文件重命名
        .pipe(rename({
            basename:'cp',
            extname:'.min.js'
        }))
        //压缩
        .pipe(uglify({
            compress:{
                properties:false
            },
            output:{
                'quote_key':true
            }
        }))
        .pipe(gulp.dest('server/public/js'))
        //监听文件是否需要自动刷新
        .pipe(gulpif(args.watch,livereload()))
})