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
    // 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上
    //Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。
    //如果Reflect.ownKeys()方法的第一个参数不是对象，会报错
    for(let key of Reflect.ownKeys(source)){
        // 对 构造函数、原型、name 等属性不进行拷贝
        if(key!=='constructor' && key!=='prototype' && key!=='name'){
            // Object.getOwnPropertyDescriptor(obj, prop) 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
            // obj 需要查找的目标对象
            // prop 目标对象内属性名称
            // 如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined
            let desc = Object.getOwnPropertyDescriptor(source,key);
            // Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象
            // Object.defineProperty(obj, prop, descriptor)
            // obj 要在其上定义属性的对象。
            // prop 要定义或修改的属性的名称。
            // descriptor 将被定义或修改的属性描述符。
            Object.defineProperty(target,key,desc);
        }
    }
}
/**
 * 多重继承
 * @param  {...any} mixins rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
 */
const mix=function(...mixins){
    class Mix{}
    for(let mixin of mixins){
        //深度拷贝类
        copyProperties(Mix,mixin);
        //深度拷贝类的原型
        copyProperties(Mix.prototype,mixin.prototype);
    }
    return Mix;
}
/**
 * 将其他类集成在一起
 * name 名称
 * cname 中文名称
 * issue 当前期号
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
 * missnum_el 遗漏选择器
 * cur_play 当前玩法
 */
class Lottery extends mix(Base,Caculate,Interface,Timer){
    constructor(name='syy',cname='11选5',issue='**',state='**'){
        super();
        this.name=name;                 //名称，多个彩种区分使用
        this.cname=cname;               //中文名称
        this.issue=issue;               //当前期号
        this.state=state;               //状态
        this.el='';                     //当前选择器
        this.miss_num=new Map();        //遗漏数字
        this.open_num=new Set();        //开奖号码
        this.open_num_list=new Set();   //开奖记录
        this.play_list=new Map();       //玩法列表
        this.number=new Set();          //选号
        this.issue_el='#curr_issue';    //期号选择器
        this.countdown_el='#countdown'; //倒计时选择器
        this.state_el='.state_el';      //状态选择器
        this.cart_el='.codelist';       //购物车选择器
        this.missnum_el='';            //遗漏选择器
        this.cur_play='r5';             //当前玩法
        this.initPlayList();            //玩法列表初始化
        this.initNumber();              //待选号码初始化
        this.updateState();             //更新状态
        this.initEvent();               //事件初始化
    }
    /**
     * 状态更新
     */
    updateState(){
        let self=this;
        self.GetNowstate().then(function(res){
            //获取当前期号
            self.issue=res.issue;
            //获取当前期截止时间
            self.end_time=res.end_time;
            //获取当前状态
            self.state=res.state;
            //更新当前期号
            $(self.issue_el).text(res.issue)
            self.countdown(res.end_time,function(time){
                // 时间更新的回调
                //更新截止时间
                $(self.countdown_el).html(time)
            },function(){
                // 倒计时结束的回调
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
        // 玩法切换
        $('#plays').on('click','li',self.changePlayNav.bind(self))
        // 号码选中
        $('.boll-list').on('click','.btn-boll',self.toggleNumActive.bind(self))
        // 添加号码
        $('#confirm_sel_code').on('click',self.addCode.bind(self))
        //操作区 全、大、小、奇、偶
        $('.dxjo').on('click','li',self.assistHandle.bind(self))
        // 随即号码
        $('.qkmethod').on('click','.btn-middle',self.getRandomCode.bind(self))
    }
}
export default Lottery;