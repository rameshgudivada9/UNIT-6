// var arr=[1,2,3,4,5];
// for(var i=0;i<arr.length;i++){
//     setTimeout(()=>{console.log(i)},i*1000)
// }
// console.log(i)

// inbuild function
var str="masaischool";

function ReverseString(str) {
    return str.split('').reverse().join('')
 }

// console.log(ReverseString(str))


// itreration mathod
var bag="";
for(var i=str.length-1;i>=0;i--){
bag=bag+str[i];
}
// console.log(bag)

// recursion method
//  var n=str.length
 function reverse(str) {
    if(str.charAt(0) === ''){
      return "";
    }
    return str.charAt(str.length -1) + reverse(str.substring(0,str.length-1));
  }
// console.log(reverse(str))

var obj1={name:"ramesh",place:"vizag"};
var obj2={name:"ramesh",place:"vizag"}

function check(obj1,obj2){
    for(let key in obj1){

        if(obj1[key]!==obj2[key])
        return false;
    }
    return true;
}

// console.log(check(obj1,obj2))



// Object 1
let objectA = {
    propertyOne: 30,
    propertyTwo: 10
  };
  
  // Object 2
  let objectB = {
    propertyOne: 30,
    propertyTwo: 10
  };
  
  // Matching the reference of the 2 objects
  objectA = objectB;
  
  // Object.is() This function returns true if they have the same 
  // reference and false if they do not.
//   console.log('Are equal? -->',  Object.is(objectA, objectB));



const express=require("express");
const app =express();

// console.log(app)


app.get("/user",function(req,res){
console.log("hello")
res.send("hello")
})

app.listen(5919,()=>{
    console.log("my 6001")
})


