let input=process.argv
const fleek = require('@fleekhq/fleek-storage-js');   
var fs = require("fs");
const path = require('path');

var pathre=path.resolve(input[2])


upLoad(pathre)



async function upLoad(filename){
  try {
    var isDirectory=fs.statSync(filename).isDirectory()
    if(isDirectory===true){
      console.log(filename+"是文件夹")
    }else if(isDirectory===false){
      console.log(filename+"是文件")
    }else{
      console.log('文件选择有问题')
      return
    }
  } catch (error) {
      console.error('没有文件或path参数有问题')
      return
  }



  if(isDirectory===true){
    var filelist=fs.readdirSync(filename)
  //  console.log(filelist)
    
    for(var i in filelist){
      console.log(filelist[i])
      var forpath =path.resolve(filename,filelist[i])
      console.log(forpath)
      
      if(fs.statSync(forpath).isDirectory()==true){
        console.log(forpath+' 是嵌套文件夹，不支持');
        continue;
      }else{
      await goUp(forpath)}
        
    }
  }else if(isDirectory===false){
  
    await goUp(filename)
  }




}


async function goUp(forpath){

  var i=0
  var j=0
  while (i==0&&j<=9) {
    if(j>0){
      console.log('重试中 '+j)
    }
  let stream=fs.createReadStream(forpath)
  const upinput = {
      apiKey: process.env.fleek_api_token,
      apiSecret: process.env.fleek_api_secret,
      key: `upload2/`+path.basename(forpath),
      stream: stream,
    };
    console.log('开始上传 '+forpath)

    try {
    const result = await fleek.streamUpload(upinput);
    console.log(result)
    i++
    } catch (error) {
      stream.close()
      console.error('上传失败 '+error)
      j++
    }
 
  }


  
}
