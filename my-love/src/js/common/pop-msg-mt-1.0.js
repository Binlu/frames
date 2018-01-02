/*
	# purpose popup
	# author  lut000
	# date    2016-07-19
	# edition 1.0
	# terminal mt
	# required jquery
	# btn change  2016-11-30
*/
!function(g){
	function atten(){
		this.box=null;			//包含框
		this.bg=null;			//背景元素
		this.tar=null;		//文本内容
		this.btn_box=null;		//按钮框
		this.btn1=null;		//确定按钮
		this.btn2=null;		//取消按钮
		this.v_list={		//相关属性
			ww:"",
			wh:"",
			suFunc:null,
			is_delay:false,
			times:800,
			_html:'<!-- 弹出提示 --><div id="msg-box" style="display: none;z-index: 9999;position: fixed;left: 10%;top:20%;width: 80%;font-size:0.8rem;padding: 2em 0;margin: auto;text-align: center;background-color: #fff;"><p class="atten-p" style="font-size:0.8em;padding:0 1.5em;line-height:1.2em">网络似乎出现了问题，请稍后再试。</p><div class="btn-div" style="margin-top: 1.5em;"><a class="js-cancel" href="javascript:void(0);" title="" style="display: inline-block;font-size:1em;line-height:1em;padding: 0.4em 1.5em;text-decoration: none;color: #DD1C5B;background-color: #fff;border:1px solid #DD1C5B">取消</a><a class="js-sure" href="javascript:void(0);" title="" style="margin-left:15px;display: inline-block;line-height:1em;font-size:1em;padding: 0.4em 1.5em;text-decoration: none;color: #fff;background-color: #DD1C5B;border:1px solid #DD1C5B">确定</a></div></div><div id="msg-bg" style="display: none;z-index: 9998;position: fixed;left: 0px;top: 0;width: 100%;height:100%;opacity: 0.7;filter:alpha(opacity=70);background-color: #000;"></div>'
		}
	}
	atten.prototype={
		init:function(){				//初始化参数
			var a=this;
			a.box=$("#msg-box");			
			a.bg=$("#msg-bg");			
			a.tar=$("#msg-box .atten-p");	
			a.btn_box=$("#msg-box .btn-div");		
			a.btn1=$("#msg-box .js-sure");		
			a.btn2=$("#msg-box .js-cancel");		
			a.resizeFunc();
			a.bindFunc();
		},
		resizeFunc:function(){			//重新计算
			var a=this,b=a.v_list;
			b["ww"]=document.documentElement.clientWidth || document.body.clientWidth;
			b["wh"]=document.documentElement.clientHeight || document.body.clientHeight;
			a.setPos();
		},
		msg:function(options,func,times){					//配置
			var a=this,b=a.tar,c=a.btn1,d=a.btn2,e=a.btn_box,f=a.v_list;
			f.suFunc=null;
			f.erFunc=null;
			if(times && typeof times ==="number"){
				e.hide();
				f.is_delay=true;
				f.times=times;
			}else{
				e.show();
				f.is_delay=false;
			}
			if(func && func instanceof Function){
				f.suFunc=func;
			}else{
				if(typeof func ==="number"){
					e.hide();
					f.is_delay=true;
					f.times=func;
				}
			}
			if(options && options instanceof Object){			//配置属性
				for(var key in options){
					switch(key){
						case "txt":
							b.html(options[key]);
							d.show();
							break;
						case "rname":
							c.text(options[key]);
							break;
						case "cname":
							d.text(options[key]);
							break;
						case "btn":
							d.hide();
							break;
						case "success":
							f.suFunc=options[key];
							break;
						case "error":
							f.erFunc=options[key];
							break;
						default:
							console.log(options[key]);
					}
				}
			}
			a.setPos();
			a.showFunc();
			if(f.is_delay){
				var timer=setTimeout(function(){
					clearTimeout(timer);
					a.hideFunc(f.suFunc);
				},f.times);
			}
		},
		bindFunc:function(){			//事件绑定
			var a=this,b=a.v_list;
			a.btn1.on("click",function(){
				a.hideFunc(b.suFunc);
			});
			a.btn2.on("click",function(){
				a.hideFunc(b.erFunc);
			});
		},
		setCss:function(options){				//设置样式
			var a=this,b=a.btn1,c=a.btn2,d=a.tar,e=a.box;
			if(options && options instanceof Object){
				for(var key in options){
					switch(key){
						case "btns":      				//按钮样式
							b.css(options[key]);
							c.css(options[key]);
							break;
						case "sbtn":  					//确定按钮
							b.css(options[key]);
							break;
						case "cbtn":  					//取消按钮
							c.css(options[key]);
							break;
						case "box":  					//包含框
							e.css(options[key]);
							break;
						case "p":  					//文本对象
							d.css(options[key]);
							break;
						default:
							console.log(null);
					}
				}
			}
		},
		setPos:function(){				//设置位置
			var a=this,w=a.v_list["ww"],h=a.v_list["wh"],box=a.box;
			var ow=box.width();
			var oh=box.height();
			a.box.css({"left":(w-ow)/2+"px","top":(h-oh)*2/5+"px"});
		},
		showFunc:function(){			//显示
			var a=this,box=a.box,bg=a.bg;
			box.fadeIn(200);
			bg.fadeIn(400);
		},
		hideFunc:function(fn){			//隐藏
			var a=this,box=a.box,bg=a.bg;
			box.fadeOut(200,function(){
				if(fn && fn instanceof Function){
					fn();
				}
			});
			bg.fadeOut(400);
		}
	}
	g.pop=new atten();
	$(function(){
		$("body").append(pop.v_list._html);
		pop.init();
		$(window).on("resize",function(){pop.resizeFunc()});
	});
}(window);