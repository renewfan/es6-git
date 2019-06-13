import $ from 'jquery';

class Base{
    //初始化玩法列表
    initPlayList(){
        this.play_list.set('r2',{
            bonus:6,
            tip:'从01~11中任选2个或多个号码，所选号码与开奖号码任意两个号码相同，即中奖<em class="red">6</em>元',
            name:'任二'
        })
        .set('r3',{
            bonus:19,
            tip:'从01~11中任选3个或多个号码，所选号码与开奖号码任意三个号码相同，即中奖<em class="red">19</em>元',
            name:'任三'
        })
        .set('r4',{
            bonus:78,
            tip:'从01~11中任选4个或多个号码，所选号码与开奖号码任意四个号码相同，即中奖<em class="red">78</em>元',
            name:'任四'
        })
        .set('r5',{
            bonus:540,
            tip:'从01~11中任选5个或多个号码，所选号码与开奖号码任意五个号码相同，即中奖<em class="red">540</em>元',
            name:'任五'
        })
        .set('r6',{
            bonus:90,
            tip:'从01~11中任选6个或多个号码，所选号码与开奖号码任意六个号码相同，即中奖<em class="red">90</em>元',
            name:'任六'
        })
        .set('r7',{
            bonus:26,
            tip:'从01~11中任选7个或多个号码，所选号码与开奖号码任意七个号码相同，即中奖<em class="red">26</em>元',
            name:'任七'
        })
        .set('r8',{
            bonus:9,
            tip:'从01~11中任选8个或多个号码，所选号码与开奖号码任意八个号码相同，即中奖<em class="red">9</em>元',
            name:'任八'
        })
    }
    //初始化待选号码
    initNumber(){
        //通过add()方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。
        //padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。
        //如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串
       for(let i=0;i<12;i++){
           //''+2 数字转字符串
        this.number.add(''+i).padStart(2,'0')
       } 
    }
    /**
     * 设置遗漏数据
     * @param {array} missnum 传入的数据
     */
    setMissnum(missnum){
        let self=this;
        self.miss_num.clear();
        for(let [index,item] of miss_num.entries()){
            self.miss_num.set(index,item)
        }
        //显示到页面
        $(self.missnum_el).each(function(index,item){
            $(item).text(self.miss_num.get(index))
        })
    }
    /**
     * 设置开奖号码
     * @param {*} num 
     */
    setOpennum(num){
        let self=this;
        self.open_num.clear()
        for(let item of num.values()){
            self.open_num.add(item)
        }
        self.updateOpennum && self.updateOpennum.call(self,num)
    }
    /**
     * 号码选择取消切换
     * @param {*} e 
     */
    toggleNumActive(e){
        let self=this;
        //获取数字dom
        let $cur=$(e.currentTarget);
        $cur.toggleClass('btn-boll-active');
        //计算金额等
        self.getCount();
    }
    /**
     * 切换玩法 任二、任三、任四。。。
     * @param {*} e 
     */
    changePlayNav(e){
        let self=this;
        //获取玩法按钮dom
        let $cur=$(e.currentTarget);
        //选中元素 active 同级其他元素取消
        $cur.addClass('active').siblings().removeClass('active');
        // 获取选中的玩法
        // desc="R2" 将元素值转小写
        self.cur_play=$cur.attr('desc').toLocaleLowerCase();
        //切换对应tip语句
        $('#zx_sm span').html(self.play_list.get(self.cur_play).tip);
        //切换玩法将上次选中的号码清空
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        //重新计算金额等
        self.getCount();
    }
    /**
     * 操作区 全、大、小、奇、偶
     * @param {*} e 
     */
    assistHandle(e){
        //阻止默认事件
        e.preventDefault();
        let self=this;
        let $cur=$(e.currentTarget);
        //当前点击元素的索引
        let index=$cur.index();
        //点击操作区将上次选中的号码清空
        $('.boll-list .btn-boll').removeClass('btn-boll-active');
        switch(index){
            //全选
            case 0:
                $('.boll-list .btn-boll').addClass('btn-boll-active');
                break;
            //大 选中大于5的
            case 1:
                $('.boll-list .btn-boll').each(function(i,t){
                    if(t.textContent-5>0){
                        $(t).addClass('btn-boll-active');
                    }
                })
                break;
            //小 选中大小于6的
            case 2:
                    $('.boll-list .btn-boll').each(function(i,t){
                        if(t.textContent-6<0){
                            $(t).addClass('btn-boll-active');
                        }
                    })
                    break;
            //奇
            case 3:
                    $('.boll-list .btn-boll').each(function(i,t){
                        if(t.textContent%2==1){
                            $(t).addClass('btn-boll-active');
                        }
                    })
                    break;
            //偶
            case 4:
                    $('.boll-list .btn-boll').each(function(i,t){
                        if(t.textContent%2==0){
                            $(t).addClass('btn-boll-active');
                        }
                    })
                    break;
        }
        //重新计算金额等
        self.getCount();
    }
    /**
     * 获取当前彩票名称
     */
    getName(){
        return this.name;
    }
    /**
     * 确认选号-处理选的数字
     */
    addCode(){
        let self=this;
        //两个数字一组分开
        let $active=$('.boll-list .btn-boll').text().match(/\d{2}/g);
        let active=$active ? $active.length : 0;
        //计算彩票注数
        let count=self.LotteryCount(active,self.cur_play);
        if(count){
            self.addCodeItem($active.join(''),self.cur_play,self.play_list.get(self.cur_play).name,count)
        }
    }
    /**
     * 确认选号-组成html，计算注数、金额
     * @param {*} code      选中的数字
     * @param {*} type      类型
     * @param {*} typeName  类型名称
     * @param {*} count     彩票注数
     */
    addCodeItem(code,type,typeName,count){
        let self=this;
        const tpl=`
        <li codes="${type}|${code}" bonus="${count*2}" count="${count}">
            <div class="code">
                <b>${typeName}${count>1 ? '复式' : '单式'}</b>
                <b class="em">${code}</b>
                [${count}注，<em class="code-list-money">${count*2}</em>]
            </div>
        </li>
        `;
        $(self.cart_el).append(tpl);
        self.getTotal();
    }

}