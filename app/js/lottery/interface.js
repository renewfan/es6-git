import $ from 'jquery';

class Interface{
    //每期更新
    /**
     * 获取遗漏的数字   
     * @param {*} issue 当前期号
     */
    GetMissnum(issue){
        let self=this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'/get/missnum',
                data:{
                    issue:issue
                },
                dataType:'json',
                success(res){
                    //将当前数据保存到当前对象
                    self.SetMissnum(res.data)
                    //将获取的数据传递到下一步
                    resolve.call(self,res)
                },
                error(err){
                    //错误则不执行下一步
                    reject.call(err)
                }
            })
        })
    }
    
    /**
     * 获取开奖号码  
     * @param {*} issue 当前期号
     */
    GetOpennum(issue){
        let self=this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'/get/opennum',
                data:{
                    issue:issue
                },
                dataType:'json',
                success(res){
                    //将当前数据保存到当前对象
                    self.SetOpennum(res.data)
                    //将获取的数据传递到下一步
                    resolve.call(self,res)
                },
                error(err){
                    //错误则不执行下一步
                    reject.call(err)
                }
            })
        })
    }

    /**
     * 获取当前状态 
     * @param {*} issue 当前期号
     */
    GetNowstate(issue){
        let self=this;
        return new Promise((resolve,reject)=>{
            $.ajax({
                url:'/get/nowstate',
                data:{
                    issue:issue
                },
                dataType:'json',
                success(res){
                    //将获取的数据传递到下一步(期号的更新等)
                    resolve.call(self,res)
                },
                error(err){
                    //错误则不执行下一步
                    reject.call(err)
                }
            })
        })
    }
}

export default Interface;