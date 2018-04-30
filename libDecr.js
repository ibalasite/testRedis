var redis = require('redis');
var readConfig = require('read-config'),
 config = readConfig('./config.json');
 
var port=config.Redis.Port;
var host=config.Redis.Host;
const {promisify} = require('util');
async function multiexec(key,client,func,count){
        const getAsync = promisify(client.get).bind(client);

        var data = await getAsync(key);
       
        
        console.log("data="+data+",count="+count);
        if(data > 0 && count > 0){  
            var multi = client.multi()
            multi.decr(key,redis.print);
            multi.exec(function(err,replies){
                multi.discard();
                if (err){
                    console.log("exec error:"+err+"count:"+count);
                    multiexec(key,client,func,--count);
		} else{;
                    if(replies != null){
                        //console.log("result:"+replies); 
                        func(null,replies);
                        client.quit();
                    }else{
                       multiexec(key,client,func,--count);
                    }
                }
            })
        }else{
            console.log(key+"<=0,count="+count);
            //func("key <0, count="+count,0);
            func(null,null);
            client.quit();
        }

}
module.exports = {
    decr: async function (key,func){
        var client = redis.createClient(port, host);
        client.on("error", function(error) {
             console.log(error);
        });
        client.on("error", function(error) {
             console.log(error);
        });
            client.watch(key)
            return await multiexec(key,client,func,10);
       }
    }
