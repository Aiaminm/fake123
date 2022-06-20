let input=process.argv
const fleek = require('@fleekhq/fleek-storage-js');   
var fs = require("fs");
const path = require('path');

var pathre=path.resolve(input[2])


upLoad(pathre)



async function upLoad(filename){
var i=0
var j=1
while(i==0&&j<4){
try {

const upinput = {
    apiKey: process.env.fleek_api_token,
    apiSecret: process.env.fleek_api_secret,
    key: `upload/`+path.basename(filename),
    stream: fs.createReadStream(filename),
  };
  console.log('开始上传 '+filename)
  const result = await fleek.streamUpload(upinput);
  console.log(result)
  i++
}
catch (error) {
console.error(path.basename(filename)+'上传失败 '+j)
j++
}
}
}