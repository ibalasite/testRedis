const args = require('yargs').argv;
const messager = require("./async.js");
if(args.message !== undefined ){
    messager.agentSend(args.message,"test1",function(msg,id){
          console.log("callback msg:"+msg+",id="+id);
    });
}else{
    console.log('--message must be setting');
}

