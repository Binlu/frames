const greeter=require("./greeter.js");
var odiv=document.querySelector(".div1");
odiv.innerHTML=greeter.says;
odiv.style.cssText="color:"+greeter.color+";font-size:"+greeter.fontsize;