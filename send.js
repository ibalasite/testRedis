var readConfig = require('read-config'),
    config = readConfig('./config.json');
var RedisSMQ = require("rsmq"); 
var port=config.Redis.Port;
var host=config.Redis.Host;
var qname=config.Redis.Queue.Nmae;
var retry=config.Redis.Queue.RetryCount;
var rsmq = new RedisSMQ( {host:host , port: port, ns: "rsmq"} );

rsmq.sendMessage({qname:qname, message:"Hello World"}, function (err, resp) {
	if (resp) {
		console.log("Message sent. ID:", resp);
	}
        console.log("wrong");
});

