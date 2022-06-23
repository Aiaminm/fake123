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

const upinput = {
    apiKey: process.env.fleek_api_token,
    apiSecret: process.env.fleek_api_secret,
    key: `upload/`+path.basename(forpath),
    stream: fs.createReadStream(forpath),
  };
  console.log('开始上传 '+forpath)
  
  try {

  const result = await fleek.streamUpload(upinput);
  console.log(result)
  } catch (error) {
    console.error('上传错误'+error)
  }

}
