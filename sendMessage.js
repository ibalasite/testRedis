const args = require('yargs').argv;
const messager = require("./send.js");
if(args.message !== undefined ){
    messager.send(args.message);
}else{
    console.log('--message must be setting');
}

