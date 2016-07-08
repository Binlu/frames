/*
* # date						2016-06-23
* # author						lut and all
* # content						Useful some common methods
* # edition						development 1.1
*/
(function(g){
	"use strict";
	function sharp(){
		this.edition="1.1";
	}
	sharp.prototype={
		$:function(str,op){											//获取元素
			var opar=document;
			var a=this;
			if(arguments.length>1 && typeof op =="object"){
				opar=op;
			}
			if(str && typeof str =="string"){
				var re1=/^\..+/;
				var re2=/^#.+/;
				if(re1.test(str)){
					if(document.querySelectorAll){

						return opar.querySelectorAll(str);
					}else{
						return a.getByClass(opar,str.slice(1));
					}
				}else if(re2.test(str)){
					if(document.querySelector){
						return opar.querySelector(str);
					}else{
						return opar.getElementById(str.slice(1));
					}
				}else{
					if(document.querySelectorAll){
						return opar.querySelectorAll(str);
					}else{
						return opar.getElementsByTagName(str);
					}
				}
			}else{
				return null;
			}
		},
		getByClass:function(oParent,sClass){					// 获取class
			var aResult=[];
			if(arguments.length!=0 && arguments.length>1){
				var opar=null;
				if(typeof oParent =="object" && oParent.nodeName!="undefined"){
					opar=oParent;
				}else{
					opar=document;
				}
				var aEle=opar.getElementsByTagName("*");
				if(document.querySelectorAll){
					aResult=opar.querySelectorAll("."+sClass);
				}else{
					for(var i=0,tt=aEle.length;i<tt;i++){
						if(aEle[i].className.indexOf(sClass)!=-1){
							var arr_class=aEle[i].className.split(" ");
							for(var j=0,len=arr_class.length;j<len;j++){
								if(arr_class[j]==sClass){
									aResult.push(aEle[i]);
								}
							}
						}
					}
				}
			}
			return aResult;
		},
		getStyle: function(obj,name){					// 获取样式
			if(obj.currentStyle){
				return obj.currentStyle[name];
			}
			else{
				return getComputedStyle(obj,false)[name];
			}
		},
		getNextEle: function(obj){					// 获取下一个兄弟元素
		    if(obj.nextSibling!="undefined"){
		        if(obj.nextSibling.nodeType==1){
		            return obj.nextSibling;
		            
		        }else{
		            return arguments.callee(obj.nextSibling);
		        }
		    }else{
		        return null
		    }
		},
		addEvent: function(obj,type,func){					// 事件绑定
			// obj==目标对象，type==事件,func==绑定的函数
			if(obj.addEventListener){
				obj.addEventListener(type,func,false);
			}
			else if(obj.attachEvent){
				// ie
				obj.attachEvent("on"+type,func);
			}else{
				obj.on[type]=function(){
					func();
				}
			}
		},
		removeEvent: function(obj,type,func){					// 取消事件绑定		
			if(obj.removeEventListener){
				obj.removeEventListener(type,func,false);
			}
			else if(obj.detachEvent){
				obj.detachEvent("on"+type,func);
			}else{
				obj.on[type]=null;
			}
		},
		stopBubble: function(ev){					// 阻止事件冒泡
			var e=ev || window.event;
			if(e && e.stopPropagation){
				e.stopPropagation();
			}
			else{
				window.event.cancelBubble=true;
			}
			return false;
		},
		stopDefault: function(ev){					// 阻止浏览器默认事件
			var e=ev || window.event;
			if(e && e.preventDefault){
				e.preventDefault();
			}
			else{
				window.event.returnValue=false;
			}
			return false;
		},
		retainNum:function(tar,n){
			var m=n?n:0;
			if(typeof tar =="number"){
				return tar.toFixed(m);
			}else if(typeof tar =="string"){
				var num=parseFloat(tar);
				return num.toFixed(m);
			}else if(typeof tar =="object"){
				return tar;
			}else{
				return null;
			}
		},
		checkLen: function(chars){					// 获得字符串的字符长度（汉字占两个）
			var sum = 0; 
			for (var i=0; i<chars.length; i++){ 
			    var c = chars.charCodeAt(i); 
			    if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){ 
			    	sum++; 
			    }else{     
			    	sum+=2; 
			    } 
			}
			return sum;
		},
		toThousands: function(num) {					//数字逗号隔开
		    var state="";
		    if(num.indexOf("-")!=-1){
		        state="-";
		        num=num.split("-")[1];
		    }
		    num=num.toString();
		    var arr=num.split(".");
		    var num1=arr[0]?arr[0]:0;
		    var num2=arr[1]?arr[1]:"";
		    var result = '', counter = 0,return_str='';
		    num1 = (num1 || 0).toString();
		    for (var i = num1.length - 1; i >= 0; i--) {
		        counter++;
		        result = num1.charAt(i) + result;
		        if (!(counter % 3) && i != 0) { result = ',' + result; }
		    }
		    if(num2==""){
		        return_str=result;
		    }else{
		        return_str=result+"."+num2;
		    }
		    return state+return_str;
		}
		
	}
	g.sp=new sharp();
	g.$=sp.$;
})(window);

/*----------数组方法扩充-----------*/
Array.prototype.deletion = function(){					// 数组去重
	var n = {},r=[]; //n为has表，r为临时数组
	//遍历当前数组
	for(var i = 0,len=this.length;i < len; i++){
		if (!n[this[i]]) {
			//如果hash表中没有当前项
			n[this[i]] = true; //存入hash表
			r.push(this[i]); //把当前数组的当前项push到临时数组里面
		}
	}
	return r;
}

Array.prototype.bubbleSort=function(){					// 数组排序   小----》大
    for(var i=0,len=this.length;i<len;i++){
        for(var j=i+1;j<len;j++){
            if(this[i]>this[j]){
                var t=this[j];
                this[j]=this[i];
                this[i]=t;
            }
        }
    }
}

Array.prototype.insertSort=function(){						// 插入排序   小-----》大   性能最优
	var j,key;
    for(var i=0,len=this.length;i < len; i++){ 
         j = i; key = this[j]; 
        while(--j > -1){ 
            if(this[j] > key){ 
                this[j+1] = this[j];
            }else{ break;} 
        }
        this[j+1] = key; 
    }
}
Array.prototype.systemSort=function(arr){
    return arr.sort(function(a,b){
        return a-b;
    });
}

// 检查函数运行速度
function getSpeed(func,arr){
    var t=0;
    var start=0;
    for(var i=0;i<5;i++){
        start=new Date();
        start=start.getTime();
        for(var j=0;j<10000;j++){
            func.apply(null,arr);
        }
        end=new Date();
        end=end.getTime();
        t+=(end-start);
    }
    console.log("用时:"+t/5+"ms");
}