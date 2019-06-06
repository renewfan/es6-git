{
  let ajax= function* (){
    yield new Promise(function(resolve,reject){
      //具体代码
      //接口调用返回符合预期值
      resolve({code:0})
    })
  }

  let pull=function(){
    let gen = ajax();
    let step = gen.next();
    step.value.then(function(d){
      if(d.code!=0){
        //接口调用返回不符合预期，继续执行接口
        pull()
      }else{
        //接口调用成功
        console.log('ok')
      }
    })
  }
}
