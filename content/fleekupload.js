let input=process.argv
const fleek = require('@fleekhq/fleek-storage-js');   
var fs = require("fs");
const path = require('path');

var pathre=path.resolve(input[2])


upLoad(pathre)



async function upLoad(filename){


const upinput = {
    apiKey: process.env.fleek_api_token,
    apiSecret: process.env.fleek_api_secret,
    key: `upload/`+path.basename(filename),
    stream: fs.createReadStream(filename),
  };
  console.log('开始上传 '+filename)
  const result = await fleek.streamUpload(upinput);
  console.log(result)
}


