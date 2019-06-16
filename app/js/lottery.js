import 'babel-polyfill';
import Timer from './lottery/timer';
import Caculate from './lottery/calculate';
import Interface from './lottery/interface';
import Base from './lottery/base';
import $ from 'jquery';

/**
 * 深度拷贝
 * @param {*} target 
 * @param {*} source 
 */
const copyProperties=function(target,source){
    for(let key of Reflect.ownKeys(source)){
        if(key!=='constructor' && key!=='prototype' && key!=='name'){
            let desc = Object.getOwnPropertyDescriptor(source,key);
            Object.defineProperty(target,key,desc);
        }
    }
}
/**
 * 多重继承
 * @param  {...any} mixins 
 */
const mix=function(...mixins){
    class Mix{}
    for(let mixin of mixins){
        copyProperties(Mix,mixin);
        copyProperties(Mix.prototype,mixin.prototype);
    }
    return Mix;
}
/**
 * name 名称
 * cname 中文名称
 * issue 期号
 * state 状态
 * el 当前选择器
 * miss_num 遗漏数字
 * open_num 开奖号码
 * open_num_list 开奖记录
 * play_list 玩法列表
 * number 选号
 * issue_el 期号选择器
 * countdown_el 倒计时选择器
 * state_el 状态选择器
 * cart_el 购物车选择器
 * miss_num_el 遗漏选择器
 * cur_play 当前玩法
 */
class Lottery extends mix(Base,Caculate,Interface,Timer){
    constructor(name='syy',cname='11选5',issue='**',state='**'){
        super();
        this.name=name;
        this.cname=cname;
        this.issue=issue;
        this.state=state;
        this.el='';
        this.miss_num=new Map();
        this.open_num=new Set();
        this.open_num_list=new Set();
        this.play_list=new Map();
        this.number=new Set();
        this.issue_el='#curr_issue';
        this.countdown_el='#countdown';
        this.state_el='.state_el';
        this.cart_el='.codelist';
        this.miss_num_el='';
        this.cur_play='r5';
        this.initPlayList();//初始化玩法列表
        this.initNumber();//初始化待选号码
        this.updateState();//更新状态
        this.initEvent(); //初始化事件
    }
    /**
     * 状态更新
     */
    updateState(){
        let self=this;
        self.getState().then(function(res){
            //获取当前期号
            self.issue=res.issue;
            //获取当前期截止时间
            self.end_time=res.end_time;
            //获取当前状态
            self.state=res.state;
            //更新期号
            $(self.issue_el).text(res.issue)
            self.countdown(res.end_time,function(time){
                //更新截止时间
                $(self.countdown_el).html(time)
            },function(){
                setTimeout(() => {
                    //更新销售状态
                    self.updateState();
                    //更新遗漏数字
                    self.GetMissnum(self.issue).then(function(res){});
                    //更新开奖号码
                    self.GetOpennum(self.issue).then(function(res){});
                }, 500);
            })
        })
    }
    /**
     * 事件初始化
     */
    initEvent(){
        let self=this;
        $('#plays').on('click','li',self.changePlayNav.bind(self))
        $('.boll-list').on('click','.btn-boll',self.toggleNumActive.bind(self))
        $('#confirm_sel_code').on('click',self.addCode.bind(self))
        $('.dxjo').on('click','li',self.assistHandle.bind(self))
        $('.qkmethod').on('click','.btn-middle',self.getRandomCode.bind(self))
    }
}
export default Lottery;