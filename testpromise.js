var redis = require('redis');
var readConfig = require('read-config'),
    config = readConfig('./config.json');
var port=config.Redis.Port;
var host=config.Redis.Host;
var client = redis.createClient(port, host);
key="mykey1";
const {promisify} = require('util');
const incrAsync = promisify(client.incr).bind(client);
async function scope(){
    console.log("wait....");
    const res = await incrAsync(key);
    console.log("res:"+res);
    client.quit();
}
scope();
/*
client.incr(key,function(error,reply){
    console.log("reply="+reply);
    client.quit(); 
})
*/
console.log("end");

