// 引入处理命令行参数的包
import yargs from 'yargs';

const args = yargs

    //区分运行环境
    .option('production',{
        boolean:true,  
        default:false, //默认开发环境
        describe:'min all script'
    })
    //监听文件变化 自动编译
    .option('watch',{
        boolean:true,  
        default:false,
        describe:'watch all script'
    })
    //详细输出命令行执行日志
    .option('verbose',{
        boolean:true,  
        default:false,
        describe:'log'
    })
    //映射
    .option('sourcemaps',{
        describe:'force the creation of sourcemaps'
    })
    //服务器端口
    .option('port',{
        string:true,  
        default:8080,
        describe:'server port'
    })

    //将输入的命令作为字符串进行解析
    .argv

    export default args;