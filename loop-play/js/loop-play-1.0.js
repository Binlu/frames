/*
    # purpose   轮播
    # author    lut000
    # date      2017-12-11
    # edition   1.0
    # terminal  pc
    # require   jquery
*/
// var demo=new loopFunc({
//     "container":"容器，id或者class",
//     "direction":"轮播方向：horizontal/vertical",
//     "auto":"是否自动播放：true/false",
//     "speed":"移动速度：5000ms",
//     "interval":"运动间隔：5000ms",
//     "width":"容器宽度",
//     "height":"容器高度",
//     "repeat":"是否循环滚动"
// })
!function(g){
    function loopFunc(opt){
        if(opt && opt instanceof Object){
            if(opt["container"]!==undefined){
                this.box=this.getEle(opt["container"])[0];                                                                      //包含框
                this.ul=this.getEle(".js-page-list",this.box)[0];                                                               //移动对象
                this.items=null;                                                                                                //轮播对象
                this.prev=this.getEle(".js-prev",this.box)[0];                                                                  //前一个
                this.next=this.getEle(".js-next",this.box)[0];                                                                  //下一个
                this.progres=this.getEle(".js-progress-bar",this.box)[0];                                                       //进度框
                this.progres_list=this.getEle("ol",this.progres)[0];                                                            //进度
                this.pr_li=null;                                                                                                //进度li

                this.def={
                    direction:        opt["direction"]!==undefined?opt["direction"]:"horizontal",                               //切换方向
                    loop:             opt["loop"]!==undefined?opt["loop"]:true,                                                 //是否自动播放
                    interval:         opt["interval"]!==undefined?opt["interval"]:5000,                                         //自动播放间隔时间
                    speed:            opt["speed"]!==undefined?opt["speed"]:500,                                                //移动速度
                    repeat:           opt["repeat"]!==undefined?opt["repeat"]:true,                                             //是否循环滚动
                    index:            opt["index"]!==undefined?opt["index"]:0,                                                  //当前的进度
                    width:            opt["width"],                                                                             //包含框宽度
                    height:           opt["height"],                                                                            //包含框高度
                    ow:               0,                                                                                        //移动距离x
                    oh:               0,                                                                                        //移动距离y
                    len:              0                                                                                         //轮播长度
                };
                
                this.timer=null;                                                                                                //计时器
                this.init();
            }else{
                throw "container is undefined"; 
            }
        }else{
            throw "arguments are not Object";
        };
    };
    loopFunc.prototype={
        init:function(){                                                            //初始化
            var a=this,d=a.def;
            var a_li=a.getEle("li",a.ul);
            if(a_li.length<1){
                throw "the dom of ul li is none";
            }else{
                a.setDom(a_li);
                // 设置样式
                a.reStyle();
                if(d.loop==true){
                    // 开始
                    a.setTab(d.index);
                    // 绑定事件
                    a.bindFun();
                }
                
            }
        },
        setDom:function(a_li){                                                      //生成dom
            var a=this,d=a.def;
            // 配置属性
            if(a.width!==undefined){
                a.box.style.width=a.width+"px";
            }
            if(a.height!==undefined){
                a.box.style.height=a.height+"px";
            }
            // 增加dom
            var len=a_li.length;
            if(len<=1){d.repeat=false;d.loop=false;}
            if(d.repeat===true){
                var node1=a_li[0].cloneNode(true);
                var node2=a_li[len-1].cloneNode(true);
                a.ul.insertBefore(node2,a_li[0]);
                a.ul.appendChild(node1);
            }
            a.items=a.getEle("li",a.ul);
            d.len=len;
            // 生成进度
            var o_li=null,o_frag=document.createDocumentFragment();
            for(var i=0;i<len;i++){
                var o_li=document.createElement("li");
                o_li.setAttribute("data-index",i);
                o_frag.appendChild(o_li);
            }
            a.emptyEle(a.progres_list)
            a.progres_list.appendChild(o_frag);
            a.pr_li=a.getEle("li",a.progres_list);
            if(len<=1){a.progres.style.display="none";}
        },
        bindFun:function(){                 //绑定事件
            var a=this,n=a.next,p=a.prev;
            addEvent(n,"click",function(){
                clearTimeout(a.timer);
                a.toPage(1);
            });
            addEvent(p,"click",function(){
                clearTimeout(a.timer);
                a.toPage(2);
            });

            addEvent(a.progres_list,"click",function(e){
                var ev=e || window.event;
                var tag=ev.target || ev.srcElement;
                if(tag.tagName.toUpperCase()==="LI"){
                    clearTimeout(a.timer);
                    var n_index=tag.getAttribute("data-index");
                    a.setTab(n_index*1);
                }
            });


            // 事件绑定
            function addEvent(obj,type,func){
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
            };
        },
        toPage:function(type){                 //下一个

            var a=this,d=a.def;
            var index=type==1?d.index+1:d.index-1;
            var nindex=setIndex(index);
            a.setTab(nindex);
            function setIndex(nindex){              //计算进度
                var max=d.repeat==true?d.len:d.len-1;
                var min=d.repeat==true?-1:0;
                if(nindex>max){
                    if(d.repeat===false){
                        return 0;
                    }else{
                        nindex=-1;
                    }
                }else if(nindex<min){
                    if(d.repeat===false){
                        return d.len-1;
                    }else{
                        nindex=-1;
                    }
                }
                return nindex
            }
        },
        setTab:function(index){                                                 //动画
            var a=this,d=a.def,oul=a.ul,l=d.len,w=d.ow,h=d.oh,direction=d.direction,is_auto=d.loop,s=d.speed,intv=d.interval;
            var nindex=index!==undefined?index:0;
            var data={},set_data1={},set_data2={},val=w;            //动画对象
            var play_index=d.repeat==true?(nindex+1):nindex,
                k1=d.repeat==true?l:l-1,
                k2=d.repeat==true?-1:0;
            var key_name="";
            if(direction==="horizontal"){
                val=w;
                key_name="margin-left";
            }else{
                val=h;
                key_name="margin-top";
            }

            data[key_name]=-play_index*val+"px";
            set_data1[key_name]=-k1*val;
            set_data2[key_name]=k2*val;

            // 动画执行
            $(oul).stop(true,true).animate(data,s,"linear",function(){
                if(nindex==-1){
                    $(oul).css(set_data1);
                    d.index=d.len-1;
                }else if(nindex==l){
                    $(oul).css(set_data2);
                    d.index=0;
                }else{
                    d.index=nindex;
                }
                if(is_auto===true){
                    clearTimeout(a.timer);
                    a.timer=setTimeout(function(){
                        a.toPage(1);
                    },intv);
                }
            });


            var n=nindex;
            if(n==l){
                n=0;
            }else if(n==-1){
                n=l-1;
            }
            for(var i=0;i<l;i++){
                if(i==n){
                    a.pr_li[i].className="current";
                }else{
                    a.pr_li[i].className=""; 
                }
            }
        },
        reStyle:function(){             //设置样式
            var a=this,items=a.items,d=a.def;
            // 获取基础值
            d.ow=parseFloat(a.getStyle(a.box,"width")) || a.box.offsetWidth;                //此处单为兼容ie做出调整
            d.oh=parseFloat(a.getStyle(a.box,"height")) || a.box.offsetHeight;              // the same to prev
            // 循环赋值
            var len=items.length;
            for(var i=0;i<len;i++){
                if(a.direction==="vertical"){
                    items[i].style.height=d.oh+"px";
                    items[i].style.float="none";
                }else{
                    items[i].style.width=d.ow+"px";
                }
                
            }
            if(a.direction==="vertical"){
                if(d.repeat==false){
                    a.ul.style.marginTop="0px";
                }else{
                    a.ul.style.marginTop=-d.oh+"px";
                }
                
            }else{
                if(d.repeat==false){
                    a.ul.style.marginLeft="0px";
                }else{
                    a.ul.style.marginLeft=-d.ow+"px";
                }
                a.ul.style.width=d.ow*len+"px";
            }
        },
        getEle:function(str,op){                                         //获取元素
            var opar=(op!=undefined && typeof op=="object")?op:document;
            var a=this;
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
        getByClass:function(parent,tagname){                    // 获取class
            var doms=[];
            if(arguments.length!=0 && arguments.length>1){
                var opar=(typeof parent =="object" && parent.nodeName!="undefined")?parent:document;
                if(document.querySelectorAll){
                    doms=opar.querySelectorAll("."+tagname);
                }else{
                    var eles=opar.getElementsByTagName("*");
                    for(var i=0,len=eles.length;i<len;i++){
                        if(eles[i].className.indexOf(tagname)!=-1){
                            var arr_class=eles[i].className.split(" ");
                            for(var j=0,len=arr_class.length;j<len;j++){
                                if(arr_class[j]==tagname){
                                    doms.push(eles[i]);
                                }
                            }
                        }
                    }
                }
            }
            return doms;
        },
        getStyle: function(obj,name){                   // 获取样式
            if(window.getComputedStyle){
                return getComputedStyle(obj,false)[name];
            }else if(obj.currentStyle){
                return obj.currentStyle[name];
            }else{
                return "";
            }
        },
        emptyEle:function(obj){                 //清除子节点
            var a=this;
            var childrens=obj.childNodes;
            var len=childrens.length;
            if(len>0){
                obj.removeChild(childrens[len-1]);
                a.emptyEle(obj);
            }
        }
    };
    // 模块化
    if(typeof module !=="undefined" && module.exports){
        module.exports=loopFunc;
    }else if(typeof define=="function" && define.amd){
        define(function(){
            return loopFunc;
        });
    }else{
        g.loopFunc=loopFunc;
    };
}(window);