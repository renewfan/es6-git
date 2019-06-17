var express = require('express');
var router = express.Router();
//add---
var mockjs=require('mockjs');
//add---
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//add---
/**
 * 输出当前状态、期号、截止时间
 */
var makeIssue=function(){
  var date=new Date();
  // 第一期时间
  var first_issue_date=new Date();
  first_issue_date.setHours(9);
  first_issue_date.setMinutes(10);
  first_issue_date.setSeconds(0);
  // 截止时间（每天78期，每期10min）
  var end_issue_date=new Date(first_issue_date.getTime()+77*10*60*1000);
  //当前期、截止时间，状态
  var cur_issue,end_time,state;
  // 是否正常销售
  if(date.getTime()-first_issue_date.getTime()>0 && end_issue_date.getTime()-date.getTime()>0){
    //当前时间 < 第一期 < 截止时间
    // 当前开始时间 09：00
    var cur_issue_date=new Date();
    cur_issue_date.setHours(9);
    cur_issue_date.setMinutes(0);
    cur_issue_date.setSeconds(0);
    // 计算本期剩余时间
    var mins_time=date.getTime()-cur_issue_date.getTime();
    var hour=Math.ceil(mins_time/600/1000);
    // 计算截止时间
    var end_date=new Date(end_issue_date.getTime()+hour*600*1000);
    end_time=end_date.getTime();
    cur_issue=[end_date.getFullYear(),('0'+(end_date.getMonth()+1)).slice(-2),('0'+end_date.getDate()).slice(-2),('0'+hour).slice(-2)].join('');
  }else{
    // 截止 开始新的一天
    first_issue_date.setDate(first_issue_date.getDate()+1)
    end_time=first_issue_date.getTime();
    cur_issue=[first_issue_date.getFullYear(),('0'+(first_issue_date.getMonth()+1)).slice(-2),('0'+first_issue_date.getDate()).slice(-2),'01'].join('');
  }
  // 判断状态 前8min销售，后2min开奖
  var cur_date=new Date();
  if(end_time-cur_date.getTime() > 120*1000){
    state='正在销售'
  }else{
    state='开奖中。。。'
  }
  return{
    issue:cur_issue,
    state:state,
    end_time:end_time
  }
}
//接口
/**
 * 获取遗漏的数字
 */
router.get('/get/missnum',function(req,res,next){
  res.json(mockjs.mock({
    // 'name|count': string
    // 通过重复 string 生成一个字符串，重复次数等于 count
    // 生成长度11的数据
    'data|11':[/[1-9]{1,3}|0/],
    //期号
    'issue':/[1-9]{8}/
  }))
})
/**
 * 获取开奖号码
 */
router.get('/get/opennum',function(req,res,next){
  //计算期号
  var issue=makeIssue().issue;
  //开奖号码-随机生成5位数
  var data=mockjs.mock({
    'data':[/[1-3]/,/[4-5]/,/[6-7]/,/[8-9]/,/1[0-1]/]
  }).data;
  res.json(mockjs.mock({
    issue:issue,
    data:data
  }))
})
/**
 * 获取当前状态
 */
router.get('/get/nowstate',function(req,res,next){
  //获取状态
  var state=makeIssue();
  res.json(state);
})
//add---
module.exports = router;
