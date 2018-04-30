var readConfig = require('read-config'),
    config = readConfig('./config.json');
var port=config.Redis.Port;
var host=config.Redis.Host;

module.exports = {
    send : function(msg,qname){
        var RSMQWorker = require( "rsmq-worker" );
        var worker = new RSMQWorker( qname, {host:host , port: port, autostart:false});
	worker.on("ready", function() {
                //console.log("SEND", msg);
                worker.send(msg,0,function(){
                //console.log( "SENDED msg:"+msg+",qname:"+qname );
                worker.quit();
            });
        });
    }
}; 
