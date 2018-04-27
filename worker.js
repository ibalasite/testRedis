var readConfig = require('read-config'),
    config = readConfig('./config.json');
 
var port=config.Redis.Port;
var host=config.Redis.Host;
var qname=config.Redis.Queue.Name;
var retry=config.Redis.Queue.RetryCount;

console.log(qname);
 var RSMQWorker = require( "rsmq-worker" );
 var worker = new RSMQWorker( qname, {"host":host , "port": port});
 
  worker.on( "message", function( msg, next, id ){
  	// process your message 
  	console.log("Message id : " + id);
  	console.log(msg);
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
