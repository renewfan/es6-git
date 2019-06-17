class Caculate{

    /**
     * 计算彩票注数
     * @param {num} active_num 当前选中的号码
     * @param {string} play_name  当前玩法标识名称
     * @return {num} count  注数
     */
    LotteryCount(active_num,play_name){
        let count=0;
        // 选择的玩法是否在玩法列表中
        // playlist为 map 结构
        // has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中
        const exist=this.play_list.has(play_name);
        //创建元素为0，长度为 当前选中号码长度的数组
        const arr=new Array(active_num).fill(0);
        // 检测play_name第1个字符串是不是 r
        //[ ]和at()都能读写string中的某一个字符
        //[ ]不具备下标越界检查功能，at()具备下标越界检查功能
        if(exist && play_name.at(0)==='r'){
            //调用静态方法，按照选择的玩法生成排列组合
            count=Caculate.PlayCombine(arr,play_name.split('')[1]).length
        }
        return count;
    }

    /**
     * 按照选择的玩法生成排列组合
     * @param {array} arr  参与组合运算的数组
     * @param {num} size 组合运算的基数
     * @return {array} lastresult 生成的排列组合
     */
    static PlayCombine(arr,size){
        let lastresult=[];
        (function fun(arr,size,result){
            let len=arr.length;
            if(size>len){
                return;
            }
            if(size===len){
                //最后一次
                //将上次结果与本次数组连接并加入最后结果中
                // concat() 方法用于连接两个或多个数组。
                // 该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本
                lastresult.push([].concat(result,arr))
            }else{
                //递归调用
                for(let i=0;i<len;i++){
                    let newresult=[].concat(result);
                    newresult.push(arr[i])
                    if(size==1){
                        lastresult.push(newresult);
                    }else{
                        let newarr=[].concat(arr);
                        //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目
                        //该方法会改变原始数组
                        // arrayObject.splice(index,howmany,item1,.....,itemX)
                        // index	必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
                        // howmany	必需。要删除的项目数量。如果设置为 0，则不会删除项目。
                        newarr.splice(0,i+1);
                        fun(newarr,size-1,newresult)
                    }
                }
            }
        })(arr,size,[])
        return lastresult;
    }

    /**
     * 奖金范围计算
     * @param {num} active_num 当前选中的号码
     * @param {string} play_name  当前玩法标识名称
     * @return {array} range  奖金范围
     */
    BonusCalculation(active_num,play_name){
        const play=play_name.split('');
        const self=this;
        // 创建当前选中号码长度的数组 '3'*1 字符串转数字
        let arr=new Array(play[1]*1).fill(0)
        let min,max;
        //当前玩法是组合运算类的
        if(play[0]==='r'){
            //当前选中的号码最小中奖数
            let min_active=5-(11-active_num);
            if(min_active>0){
                //当前中奖数-玩法基数 > 0
                if(min_active-play[1]>=0){
                    arr=new Array(min_active).fill(0);
                    min=Caculate.PlayCombine(arr,play[1]).length;
                }else{
                    // 大于任5的玩法
                    if(play[1]-5>0 && active_num-play[1]>=0){
                        arr=new Array(active_num-5).fill(0);
                        min=Caculate.PlayCombine(arr,play[1]-5).length;
                    }else{
                        min=active_num-play[1]>-1 ? 1 : 0;
                    }
                }
            }else{
                min=active_num-play[1]>-1 ? 1 : 0;
            }
            //当前选中的号码最大中奖数
            let max_active=Math.min(active_num,5);
            if(play[1]-5>=0){
                if(active_num-play[1]>=0){
                    arr=new Array(active_num-5).fill(0);
                    max=Caculate.PlayCombine(arr,play[1]-5).length;
                }else{
                    max=0;
                }
            }else if(play[1]-5<0){
                arr=new Array(Math.min(active_num,5)).fill(0);
                max=Caculate.PlayCombine(arr,play[1]).length;
            }else{
                max=1
            }
        }
        //注数转金额
        return [min,max].map(item=>item*self.play_list.get(play_name).bonus)
    }
}
export default Caculate;