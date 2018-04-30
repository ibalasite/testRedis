const args = require('yargs').argv;
const {promisify} = require('util');
const lib = require("./libDecr.js");
const decrAsync = promisify(lib.decr).bind(lib);


if(args.key !== undefined ){
    /*
    lib.decr(args.key,function(err,value){
         if(err !== null) console.log("error");
          console.log("result:"+value);
    });
    */
     
    ShowDecrValue(args.key); 

}else{
    console.log('--key must be setting');
}
async function ShowDecrValue(key){ 
    var value = await decrAsync(key).catch((err) => {
        console.log('Error', err);
    });
    if (value === undefined) value= null;
    console.log("func result:"+value);
}
