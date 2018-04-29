var redis = require('redis');
var readConfig = require('read-config'),
    config = readConfig('./config.json');
 
var messager = require("./send.js");
var port=config.Redis.Port;
var host=config.Redis.Host;
var qname=config.Redis.Queue.Name;
var retry=config.Redis.Queue.RetryCount;

var client = redis.createClient(port, host);
client.on("error", function(error) {
    console.log(error);
 });

console.log(qname);
 var RSMQWorker = require( "rsmq-worker" );
 var worker = new RSMQWorker( qname, {"host":host , "port": port});
 
  worker.on( "message", function( msg, next, id ){
  	// process your message 
  	console.log("agent:Message id : " + id);
  	console.log("agent:Message :"+msg);
       // var data = JSON.parse(msg);
        var data,returnMessage;
        returnMessage="";
        try {
            data = JSON.parse(msg);
            
            var progress = 0;
            if(data.message.cmd === "incr")
            {
                 var ret= client.incr(data.message.key, function(err, reply) {
                        //if (err) throw err;
                        console.log(reply); // 11
                        console.log("agent send cmd:"+data.message.cmd+",key:"+data.message.key+",id:"+data.id);
                        console.log("agent incr key progress="+progress+",returnMessage="+returnMessage+",data.id="+data.id);
                        returnMessage = reply; 
                        progress = 1;
                        
                        console.log("agent incr key progress="+progress+",returnMessage="+returnMessage+",data.id="+data.id);
                 });
                        console.log("agent incr key ret="+ret);
            }else{
                        returnMessage="cmd:"+data.message.cmd+",key:"+data.message.key+",id:"+data.id;
                        progress = 1;
            }

	  // while (progress === 0) 
          // { 
                        //console.log("agent loop progress="+progress+",returnMessage="+returnMessage+",data.id="+data.id);
               
          //              messager.send(returnMessage,data.id);
          // }

        } catch (e) {
            returnMessage="error";
            console.log("parse error:"+msg);
            messager.send("error",data.id);
            //return console.error(e);
        }
                

         next()
  });
 
  // optional error listeners 
  worker.on('error', function( err, msg ){
      console.log( "ERROR", err, msg.id );
  });
  worker.on('exceeded', function( msg ){
      console.log( "EXCEEDED", msg.id );
  });
  worker.on('timeout', function( msg ){
      console.log( "TIMEOUT", msg.id, msg.rc );
  });
 
  worker.start();

