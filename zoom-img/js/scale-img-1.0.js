/*
* # date                        2017-12-18
* # author                      lut000
* # porpuse                     图片缩放
* # edition                     development 1.0
*/
!function(g){
    var scaleImg=function(opt){
        var options=opt?opt:{};
        this.box=options.box!=undefined?this.getEle(options.box)[0]:this.getEle(".js-show-pic-section")[0];
        this.close_btn=this.getEle("button",this.box)[0];
        this.target_ele=this.getEle("img",this.box)[0];
        this.tool_ele=this.getEle(".js-tool-div",this.box)[0];
        this.line_ele=this.getEle("div",this.tool_ele)[0];
        this.btn=this.getEle("button",this.line_ele)[0];
        this.origin_btn=this.getEle(".js-origin-img-btn",this.tool_ele)[0];
        this.reset_btn=this.getEle(".js-reset-img-btn",this.tool_ele)[0];
        this.bg_ele=this.getEle(".js-show-pic-bg")[0];

        this.def={
            line:0,
            bw:0,
            by:0,
            b_tops:0,

            pw:0,
            ph:0,

            origin_w:0,
            origin_h:0,

            init_position:{
                ow:0,
                oh:0,
                x:0,
                y:0
            },

            k1:0,
            radio:1,
            max_radio:5,
            min_radio:0.2,
            wheel_val:0.05,
            now_position:{
                ow:0,
                oh:0,
                x:0,
                y:0
            },

            x:0,
            y:0,
            is_drag_start:false,
            is_load_img:false,
            is_get_base:false,
            src:options.src || ""
        };

        this.init();
    };

    // 原型

    scaleImg.prototype={
        init:function(){                                                                        //初始化
            var a=this,d=a.def;
            a.getImgNatural();
            a.bindFunc();
        },  
        setBaseVal:function(){
            var a=this,d=a.def;
            a.box.style.display="block";
            a.bg_ele.style.display="block";
            d.line=parseInt(a.getStyle(a.line_ele,"height"));
            d.bw=parseInt(a.getStyle(a.btn,"width"));
            d.pw=a.box.offsetWidth;
            d.ph=a.box.offsetHeight;

            d.b_tops=d.line-d.bw+10;
        },
        changeImg:function(src){
            var a=this,d=a.def;
            d.src=src;
            d.is_load_img=false;
            a.getImgNatural();
        },
        resetSize:function(){
            var a=this,d=a.def;
            a.setBaseVal();
            a.getImgSize(d.init_position.ow,d.init_position.oh);
        },
        getImgNatural:function(){                                                       //获取图片原始属性
            var a=this,d=a.def,src=d.src;
            if(src!=""){
                var o_img=new Image();
                o_img.onload=function(){
                    var ow=this.width;
                    var oh=this.height;
                    if(d.is_get_base==false){
                        d.is_get_base=true;
                        a.setBaseVal();
                    }

                    d.init_position.ow=ow;
                    d.init_position.oh=oh;
                    a.getImgSize(ow,oh);
                    d.is_load_img=true;
                };
                o_img.onerror=function(){
                    console.log("图片加载失败");
                    d.is_load_img=false;
                };
                o_img.src=src;
                a.target_ele.src=src;
            }else{
                console.log("图片路径为空！");
            }
        },
        getImgSize:function(ow,oh){
            var a=this,d=a.def,nw=ow,nh=oh;
            var k1=d.k1=ow/oh,k2=d.pw/d.ph;
            if(k1>k2){
                if(ow>d.pw){
                    nw=d.pw;
                    nh=d.pw/k2;
                }
            }else{
                if(oh>d.ph){
                    nw=d.ph*k1;
                    nh=d.ph;
                }
            }
            nw=parseInt(nw);
            nh=parseInt(nh);
            d.radio=(nw/ow).toFixed(3);
            a.setImgSize(nw,nh,(d.pw-nw)/2,(d.ph-nh)/2);
        },
        setImgSize:function(ow,oh,x,y){
            var a=this,d=a.def;
            a.target_ele.style.width=ow+"px";
            a.target_ele.style.height=oh+"px";
            a.target_ele.style.left=x+"px";
            a.target_ele.style.top=y+"px";

            d.now_position.ow=ow;
            d.now_position.oh=oh;
            d.now_position.x=x;
            d.now_position.y=y;
        },
        setLinePosition:function(){
            var a=this,d=a.def;
            var tops=d.b_tops;
            var bk=(d.radio-d.min_radio)/(d.max_radio-d.min_radio);
            d.by=tops*bk;
            a.btn.style.top=d.by+"px";
        },
        dragScale:function(){
            var a=this,d=a.def;
            d.radio=(d.by/d.b_tops)*(d.max_radio-d.min_radio)+d.min_radio;
            var ow=d.init_position.ow*d.radio;
            var oh=d.init_position.oh*d.radio;
            var x=d.now_position.x+(d.now_position.ow-ow)/2;
            var y=d.now_position.y+(d.now_position.oh-oh)/2;
            a.setImgSize(ow,oh,x,y);
            a.btn.style.top=d.by+"px";
        },
        bindFunc:function(ntype){           //事件绑定
            var a=this,d=a.def;
            var isfirefox = typeof document.body.style.MozUserSelect != 'undefined';
            // 关闭窗口
            // a.addEvent(a.box,"click",function(e){
            //     var ev=e || window.event;
            //     var target_click=ev.target || ev.srcElement;
            //     var type=target_click.getAttribute("data-click") || "";
            //     if(type==1){
            //         a.box.style.display="none";
            //         a.bg_ele.style.display="none";
            //     }
            // });

            // 监听滚轮事件
            var mouse_event_str=isfirefox==true?"DOMMouseScroll":"mousewheel";
            var relative_x=0,relative_y=0,kx=0,ky=0;
            a.addEvent(a.box,mouse_event_str,function(e){
                if(d.is_load_img==false){return;}
                var delta = getWheelValue(e);
                var ev=e || window.event;
                var client_x=ev.clientX;
                var client_y=ev.clientY;

                relative_x=client_x-d.now_position.x;
                relative_y=client_y-d.now_position.y;
                kx=relative_x/d.now_position.ow;
                ky=relative_y/d.now_position.oh;
                var ns=d.radio/5;
                if(delta>0){
                    // 放大
                    d.radio+=ns;
                }else{
                    d.radio-=ns;
                }
                if(d.radio<d.min_radio){
                    d.radio=d.min_radio;
                }else if(d.radio>d.max_radio){
                    d.radio=d.max_radio;
                }
                nw=d.radio*d.init_position.ow;
                nh=d.radio*d.init_position.oh;
                d.now_position.x=client_x-kx*nw;
                d.now_position.y=client_y-ky*nh;

                a.setImgSize(nw,nh,d.now_position.x,d.now_position.y);
                a.setLinePosition();
                a.stopDefault(e);
            });
            var btn_ry=0,btn_y=0,is_btn_drag_start=false;
            a.addEvent(a.btn,"mousedown",function(e){
                is_btn_drag_start=true;
                btn_ry=e.clientY-this.offsetTop;
            });
            a.addEvent(a.btn,"mousemove",function(e){
                if(is_btn_drag_start==true){
                    var ev=e || window.event;
                    btn_y=ev.clientY-btn_ry;
                    if(btn_y<0){
                        btn_y=0;
                    }else if(btn_y>d.b_tops){
                        btn_y=d.b_tops;
                    }
                    d.by=btn_y;
                    a.dragScale();
                    
                }
            });
            a.addEvent(a.btn,"mouseup",function(e){
                is_btn_drag_start=false;
            });

            // 拖拽
            var rx=0,ry=0;
            a.addEvent(a.target_ele,"mousedown",function(e){
                var ev=e || windo.event;
                var self=ev.target || ev.srcElement;
                d.is_drag_start=true;
                rx=e.clientX-self.offsetLeft;
                ry=e.clientY-self.offsetTop;
            });
            a.addEvent(a.box,"mousemove",function(e){
                var ev=e || window.event;
                if(d.is_drag_start==true){
                    d.now_position.x=ev.clientX-rx;
                    d.now_position.y=ev.clientY-ry;
                    dragFunc(a.target_ele,d.now_position.x,d.now_position.y);
                }
                if(is_btn_drag_start==true){
                    btn_y=ev.clientY-btn_ry;
                    if(btn_y<0){
                        btn_y=0;
                    }else if(btn_y>d.b_tops){
                        btn_y=d.b_tops;
                    }
                    d.by=btn_y;
                    a.dragScale();
                }
            });
            a.addEvent(a.box,"mouseup",function(e){
                d.is_drag_start=false;
                is_btn_drag_start=false;
            });
            a.addEvent(a.box,"mouseleave",function(e){
                d.is_drag_start=false;
            });

            // 复位
            a.addEvent(a.reset_btn,"click",function(e){
                a.resetSize();
            });
            // 原图
            a.addEvent(a.origin_btn,"click",function(e){
                a.target_ele.style.width=d.init_position.ow+"px";
                a.target_ele.style.height=d.init_position.oh+"px";
                var top=d.init_position.oh>d.ph?0:(d.ph-d.init_position.oh)/2;
                var left=d.init_position.ow>d.pw?0:(d.pw-d.init_position.ow)/2;
                a.target_ele.style.left=left+"px";
                a.target_ele.style.top=top+"px";
            });


            function dragFunc(obj,x,y){
                obj.style.left=x+"px";
                obj.style.top=y+"px";
            };
            //取得滚动值 
            function getWheelValue( e ) { 
                e = e||event; 
                return ( e.wheelDelta ? e.wheelDelta/120 : -( e.detail%3 == 0 ? e.detail/3 : e.detail ) ) ; 
            } 

        },
        /*---------------绑定事件-----------------*/
        addEvent: function(obj,type,func){                  // 事件绑定
            if(obj.addEventListener){
                obj.addEventListener(type,func,false);
            }else if(obj.attachEvent){
                // ie
                obj.attachEvent("on"+type,func);
            }else{
                obj.on[type]=func;
            }
        },
        removeEvent: function(obj,type,func){                   // 取消事件绑定       
            if(obj.removeEventListener){
                obj.removeEventListener(type,func,false);
            }
            else if(obj.detachEvent){
                obj.detachEvent("on"+type,func);
            }else{
                obj.on[type]=null;
            }
        },
        stopBubble: function(ev){                   // 阻止事件冒泡
            var e=ev || window.event;
            if(e && e.stopPropagation){
                e.stopPropagation();
            }else{
                window.event.cancelBubble=true;
            }
            return false;
        },
        stopDefault: function(ev){                  // 阻止浏览器默认事件
            var e=ev || window.event;
            if(e && e.preventDefault){
                e.preventDefault();
            }else{
                window.event.returnValue=false;
            }
            return false;
        },
        getStyle:function(obj,name){                    // 获取样式----------ie7需要单独处理
            if(obj.currentStyle){
                return obj.currentStyle[name];
            }else{
                return getComputedStyle(obj,false)[name];
            }
        },
        getEle:function(str,op){                                            //获取元素
            var a=this;
            var opar=document;
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
        getByClass:function(oParent,sClass){                    // 获取class
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
        isIE:function(){
            return !!window.ActiveXObject || "ActiveXObject" in window;
        }  
    };
    
    // 模块化
    if(typeof module !=="undefined" && module.exports){
        module.exports=scaleImg;
    }else if(typeof define=="function" && define.amd){
        define(function(){
            return scaleImg;
        });
    }else{
        g.scaleImg=scaleImg;
    };
}(window);