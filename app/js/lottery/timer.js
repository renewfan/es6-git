class Timer{
    /**
     * 倒计时
     * @param {*} end 截止时间
     * @param {*} update 时间更新的回调
     * @param {*} handle 倒计时结束的回调
     */
    countdown(end,update,handle){
        const self=this;
        const nowtime=new Date().getTime();
        if(nowtime-end){
            //已过截止时间
            handle.call()
        }else{
            //当前距离截止时间还有多久
            let remaintime=end-nowtime;
            const one_day=24*60*60*1000;
            const one_hour=60*60*1000;
            const one_min=60*1000;
            const one_sec=1000;
            //还剩 x天x时x分x秒
            let d=Math.floor(remaintime/one_day);
            let h=Math.floor((remaintime-d*one_day)/one_hour);
            let m=Math.floor((remaintime-d*one_day-h*one_hour)/one_min);
            let s=Math.floor((remaintime-d*one_day-h*one_hour-m*one_min)/one_sec);
            let arr=[];
            if(d>0){
                arr.push(`<em>${d}</em>天`)
            }
            //不能出现 x天0时x分x秒
            if(arr.length>0 || h>0){
                arr.push(`<em>${h}</em>时`)
            }
            if(arr.length>0 || m>0){
                arr.push(`<em>${m}</em>分`)
            }
            if(arr.length>0 || s>0){
                arr.push(`<em>${s}</em>秒`)
            }
            //数组转换 x天 x时 x分 x秒
            self.remaintime=arr.join('');
            //时间更新回调函数
            update.call(self,arr.join(''));
            setTimeout(() => {
                //每 1s 进行一次倒计时循环处理
                self.countdown(end,update,handle)
            }, 1000);
        }
    }
}