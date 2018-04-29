var redis = require('redis');
var readConfig = require('read-config'),
 config = readConfig('./config.json');
 
var port=config.Redis.Port;
var host=config.Redis.Host;
function multiexec(key,client,count){
    client.get(key,function(err,data){
        
        //console.log("data="+data+",count="+count);
        if(data > 0 && count > 0){  
            var multi = client.multi()
            multi.decr(key,redis.print);
            multi.exec(function(err,replies){
                multi.discard();
                if (err){
                    console.log("exec error:"+err+"count:"+count);
                    multiexec(key,client,--count);
		} else{;
                    if(replies != null){
                        //console.log("result:"+replies); 
                        client.quit();
                    }else{
                       multiexec(key,client,--count);
                    }
                }
            })
        }else{
            console.log(key+"<=0,count="+count);
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
    multiexec(key,client,10);
}

DECR('mykey1');
