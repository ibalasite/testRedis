const args = require('yargs').argv;
const messager = require("./async.js");
var uniqid = require('uniqid');

if(args.message !== undefined ){
    messager.agentSend(args.message,"test"+uniqid(),function(msg,id){
          console.log("callback msg:"+msg+",id="+id);
    });
}else{
    console.log('--message must be setting');
}

