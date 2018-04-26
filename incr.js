var redis = require('redis');
var readConfig = require('read-config'),
 config = readConfig('./config.json');

var port=config.Redis.Port;
var host=config.Redis.Host;

function INCR(key){
var client = redis.createClient(port, host);
client.on("error", function(error) {
    console.log(error);
});
//client.on('connect', function() {
//    console.log('connected');
//});
client.on("error", function(error) {
    console.log(error);
});
client.incr(key, function(err, reply) {
    if (err) throw err;
    console.log(reply); // 11
});
client.quit();
}

INCR('mykey1');
