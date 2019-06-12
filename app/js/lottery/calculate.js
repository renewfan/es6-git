class Caculate{
    /**
     * 计算彩票注数
     * @param {*} active_num 当前选中的号码
     * @param {*} paly_name  当前玩法标识名称
     */
    Lotterycount(active_num,paly_name){
        let count=0;
        // 选择的玩法是否在玩法列表中
        // playlist为 map 结构
        // has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中
        const exist=this.playlist.has(paly_name);
        //创建元素为0，长度为 当前选中号码长度的数组
        const arr=new Array(active_num).fill(0);
        // 检测paly_name第1个字符串是不是 r
        //[ ]和at()都能读写string中的某一个字符
        //[ ]不具备下标越界检查功能，at()具备下标越界检查功能
        if(exist && paly_name.at(0)==='r'){
            count=Caculate.combine(arr,paly_name.split('')[1])
        }
        return count;
    }
}