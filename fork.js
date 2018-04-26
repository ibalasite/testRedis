var fork = require('child_process').fork; // ?~I?~E? child_process 模?~D

//console.log('Fork a new child_process now...');
const args = require('yargs').argv;
if(args.debug !== undefined)
{
console.log('count: ' + args.count);  
console.log('path: ' + args.path); 
}
if(args.count !== undefined && args.path !== undefined)
{
 for(var i = 0; i < args.count; i++){
  fork(args.path); // ?~T??~T~_?~V??~Z~D child process
 }
}else{
 console.log('--count and --path must be setting');
}
