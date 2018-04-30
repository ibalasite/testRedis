var Sync = require('sync');

function asyncFunction(a, b, callback) {
    process.nextTick(function(){
        callback(null, a + b);
    });
};

Sync(function(){
    var a, b, c;

    // section 1
    asyncFunction(2,3, function(e, result) {
        console.log("section1="+result); //5
        c = result + 10;
       console.log( "section1="+c );  //15
    });
    console.log("section 1 end");
    // section 2
    a = asyncFunction.sync(null, 2, 3);
    console.log("section2="+a); // 5
    var b = a + 10;
    console.log("section2="+b); //15
    console.log("section 2 end");
});

// section 3

asyncFunction(2,3, function(e, result) {
    console.log("session3="+result);  //5
    var c = result + 10;
    console.log("session3"+ c );  //15 
});
    console.log("section 3 end");
