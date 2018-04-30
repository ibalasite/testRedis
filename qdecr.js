var redis = require('redis');
var readConfig = require('read-config'),
 config = readConfig('./config.json');
const messager = require("./async.js");
var uniqid = require('uniqid');
 
var port=config.Redis.Port;
var host=config.Redis.Host;
var data;
function multiexec(key,client){
    client.get(key,function(err,data){
        
        //console.log("data="+data+",count="+count);
        if(data > 0 ){  
            var multi = client.multi()
            multi.decr(key,redis.print);
            multi.exec(function(err,replies){
                multi.discard();
                if (err){
                    //console.log("exec error:"+err);
                    messager.agentSend("{\"cmd\":\"decr\",\"key\":\""+key+"\"}","test"+uniqid(),function(msg,id){
                           //console.log("callback msg:"+msg+",id="+id);
                           data = JSON.parse(msg)
                           console.log("result:"+data.result);
                           client.quit();
                           
                     });
                    //multiexec(key,client,--count);
		} else{;
                    if(replies != null){
                        //console.log("result:"+replies); 
                        client.quit();
                    }else{
                       messager.agentSend("{\"cmd\":\"decr\",\"key\":\""+key+"\"}","test"+uniqid(),function(msg,id){
                           //console.log("callback msg:"+msg+",id="+id);
                           data = JSON.parse(msg)
                           console.log("result:"+data.result);
                           client.quit();
                           
                        });
                       
                       //multiexec(key,client,--count);
                    }
                }
            })
        }else{
            console.log(key+"<=0");
            client.quit();
        }
    })

}
function DECR(key){
var client = redis.createClient(port, host);
client.on("error", function(error) {
    console.log(error);
});
client.on("error", function(error) {
    console.log(error);
});
    client.watch(key)
    multiexec(key,client);
}

DECR('mykey1');
