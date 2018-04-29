var readConfig = require('read-config'),
    config = readConfig('./config.json');
var qname=config.Redis.Queue.Name;
const args = require('yargs').argv;
const messager = require("./send.js");
if(args.message !== undefined ){
    messager.send(args.message,qname);
}else{
    console.log('--message must be setting');
}

