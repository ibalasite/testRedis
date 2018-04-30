var readConfig = require('read-config'),
    config = readConfig('./config.json');

const args = require('yargs').argv;
const messager = require("./send.js");
if(args.message !== undefined && args.qname !== undefined){
    messager.send(args.message,args.qname);
}else{
    console.log('--message and --qname must be setting');
}

