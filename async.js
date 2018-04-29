var unixTime = require('unix-time');
 
var readConfig = require('read-config'),
    config = readConfig('./config.json');
 
var RSMQWorker = require( "rsmq-worker" );
var port=config.Redis.Port;
var host=config.Redis.Host;

var qname=config.Redis.Queue.Name;
var retry=config.Redis.Queue.RetryCount;
module.exports = {
    agentSend : agentSend
};
function agentSend(msg,id,func){
    var worker = new RSMQWorker( qname, {host:host , port: port, autostart:false});
    worker.on("ready", function() {
        console.log(unixTime(new Date())+"async SEND", msg);
        worker.send("{\"message\":"+msg+",\"id\":\""+id+"\"}",0,function(){
            console.log(unixTime(new Date())+"async callback start");    
            callBack(id,msg,func);
            console.log(unixTime(new Date())+"async callback end");    
            worker.quit();
        });
    });
}

function callBack(queueName,message,func)
{
 var worker = new RSMQWorker( queueName, {"host":host , "port": port});
 
  worker.on( "message", function( msg, next, id ){
  	// process your message 
  	console.log("wait");
        worker.stop();        
        worker.quit();
        if(msg === "error")
        {
           //agentSend(message,queueName,func);
           console.log("error");
        }else{
            func(msg,id);

        }        
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
}
