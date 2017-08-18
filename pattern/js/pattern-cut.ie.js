/*
* # date						2017-05-02
* # author						lut
* # content						cut img by pattern
* # edition						development 1.0
*/
!function(g){
	var setPattern=function(opt){
		var options=opt?opt:{};
		// 获取元素
		this.box=this.getEle(".js-pattern-box")[0];			//包含框
		this.pattern_area=this.getEle(".js-pattern-div",this.box)[0];			//模型展示区域
		this.mask_ele=this.getEle(".js-mask-pic",this.pattern_area)[0];			//模型图片
		this.pattern_ele=this.getEle(".js-pattern-pic",this.pattern_area)[0];			//花型图片
		this.tool_box=this.getEle(".js-tool-div",this.box)[0];			//工具框
		this.line_ele=this.getEle("div",this.tool_box)[0];			//缩放标尺
		this.btn=this.getEle("button",this.line_ele)[0];			//拖拽按钮
		this.add_btn=this.getEle(".js-add-ratio",this.tool_box)[0];			//放大
		this.reduce_btn=this.getEle(".js-reduce-ratio",this.tool_box)[0];			//缩小

		// 预置属性
		this.def={
			bw:0,		//区域宽
			bh:0,		//区域高
			width:0,		//图片宽度
			height:0,		//图片高度
			nw:0,			//当前宽度
			nh:0,			//当前高度
			k:0.1,			//点击缩放比例
			k2:20,			//滚轮缩放比例
			ratio:options["ratio"]!=undefined?options["ratio"]:1,		//当前放大比例
			relative_x:options["x"]!=undefined?options["x"]:0,		//当前位置x
			relative_y:options["y"]!=undefined?options["y"]:0,		//当前位置y
			max_ratio:options["max_ratio"]!=undefined?options["max_ratio"]:5,			//最大放大比例
			min_ratio:options["min_ratio"]!=undefined?options["min_ratio"]:0.5,			//最小缩放比例
			y:0,		//当前按钮位置
			is_load_img:false,
			is_load_img2:false,
			is_load_error:false,
			is_set_pattern:false,
			limit_x_val:600,
			limit_y_val:900,

			btn_w:0,			//按钮大小
			line:0,			//按钮区间
			limit:{		//极限值
				min_x:0,
				min_y:0,
				max_x:0,
				max_y:0
			},
			out_data:{
				ratio:1,
				pos_x:0,
				pos_y:0
			}
		};
		this.init();
	};

	// 原型

	setPattern.prototype={
		init:function(){			//初始化
			var a=this,d=a.def;
			a.pattern_area.style.background="none";
			a.pattern_ele.style.display="block";
			a.pattern_ele.style.left=0;
			a.pattern_ele.style.top=0;
			a.setPosFunc();
			a.getImgNatural(a.pattern_ele,1);
			a.getImgNatural(a.mask_ele,2);
			a.bindFunc();
		},	
		setPosFunc:function(){			//初始化值
			var a=this,d=a.def;
			d.btn_w=parseInt(a.getStyle(a.btn,"width"));
			d.line=parseInt(a.getStyle(a.line_ele,"height"))-d.btn_w;
			//d.bw=parseInt(a.getStyle(a.mask_ele,"width"));
			//d.bh=parseInt(a.getStyle(a.mask_ele,"height"));
		},
		getImgNatural:function(obj,type){		//获取图片原始属性
			var a=this,d=a.def;
			var o_img=new Image();
			var src=obj.src || "";
			var result_obj={w:0,h:0};
			if(src!=""){
				o_img.onload=function(){

					result_obj.w=this.width;
					result_obj.h=this.height;
					if(type && type==1){
						d.width=result_obj.w
						d.height=result_obj.h
						d.is_load_img=true;
					}else if(type && type==2){
						var ow=this.width;
						var oh=this.height;
						if(this.width<this.height){
							if(this.height>d.limit_y_val){
								ow=d.limit_y_val*this.width/this.height;
								oh=d.limit_y_val;
							}
						}else{
							if(this.width>d.limit_x_val){
								ow=d.limit_x_val;
								oh=d.limit_x_val*this.height/this.width;
							}
						}

						obj.style.height=oh+"px";
						obj.style.width=ow+"px";
						var n_top=oh<d.limit_x_val?(d.limit_x_val-oh)/2:0;
						a.pattern_area.style.marginTop=n_top+"px";
						
						a.pattern_area.style.width=ow+"px";
						a.pattern_area.style.height=oh+"px";
						d.is_load_img2=true;
						d.bw=ow;
						d.bh=oh;
					}
				};
				o_img.onerror=function(){
					d.is_load_error=true;
				};
				o_img.src=src;
			}
			return result_obj;
		},
		bindFunc:function(){			//事件绑定
			var a=this;
			var b=a.btn,d=a.def,p=a.pattern_ele,is_start_ratio=false,ry=0,last_w=0;
			if(d.is_load_error==true){
				return;
			}
			var timer=null,n_times=0;
			setStartSty();
			a.addEvent(document.body,"mouseleave",reSetStateFunc);
			/*---------------缩放--------------*/
			a.addEvent(b,"mousedown",startDragBtn);
			a.addEvent(b,"mousemove",moveFunc);
			a.addEvent(document.body,"mousemove",moveFunc);
			a.addEvent(b,"mouseup",endDragBtn);
			a.addEvent(document.body,"mouseup",endDragBtn);
			a.addEvent(a.add_btn,"click",function(){
				var y=d.y;
				y-=d.k*d.line;
				if(y<0){
					y=0;
				}
				d.y=y;
				setZoomFunc();
			});
			a.addEvent(a.reduce_btn,"click",function(){
				var y=d.y;
				y+=d.k*d.line;
				
				if(y>d.line){
					y=d.line;
				}
				d.y=y;
				setZoomFunc();
			});

			// 开始拖拽按钮
			function startDragBtn(ev){
				var e=ev || window.event;
				ry=e.clientY-b.offsetTop;
				is_start_ratio=true;
				
			};
			// 移动按钮
			function moveFunc(ev){
				if(is_start_ratio==true){
					var e=ev || window.event;
					var y=e.clientY,_y=y-ry;
					if(_y<0){
						_y=0;
					}else if(_y>d.line){
						_y=d.line;
					}
					d.y=_y;
					setZoomFunc();
				}
			};
			// 结束拖拽按钮
			function endDragBtn(ev){
				is_start_ratio=false;
				d.out_data={
					ratio:d.ratio
				};
			};

			// 设置css属性
			function setZoomFunc(){
				var _y=d.y,y2=d.line-_y;
				if(typeof _y ==="number"){
					var ratio1=2*_y/d.line;
					var ratio2=_y/d.line;
					var ratio3=2*y2/d.line;
					if(ratio2<0.5){
						ratio2=(1-ratio1)*(d.max_ratio-1)+1;
					}else if(ratio2>0.5){
						ratio2=ratio3*(1-d.min_ratio)+d.min_ratio;
					}else{
						ratio2=1;
					}
					ratio2=ratio2<d.min_ratio?d.min_ratio:ratio2;
					d.ratio=ratio2.toFixed(3);
					b.style.top=_y+"px";
					// ie 8 滚轮事件问题 d.width=0
					if(d.width!=0){p.style.width=d.ratio*d.width+"px";}
				}
			};


			/*---------------拖拽--------------*/
			var m=a.mask_ele,pa=a.pattern_area,is_drag_start=false,drag_def={
				x:0,
				y:0,
				client_x:0,
				client_y:0
			};
			a.addEvent(m,"mousedown",startDrag);
			a.addEvent(m,"mousemove",moveDragFunc);
			a.addEvent(document.body,"mousemove",moveDragFunc);
			a.addEvent(m,"mouseup",endDrag);
			a.addEvent(pa,"mouseup",endDrag);


			// 开始拖拽
			function startDrag(ev){
				var e=ev || window.event;
				is_drag_start=true;
				drag_def.client_x=ev.clientX;
				drag_def.client_y=ev.clientY;
				drag_def.x=parseInt(a.getStyle(p,"left"));
				drag_def.y=parseInt(a.getStyle(p,"top"));

				d.limit.min_x=parseInt(a.getStyle(p,"width"));
				d.limit.min_y=parseInt(a.getStyle(p,"height"));
			};
			// 移动
			function moveDragFunc(ev){
				if(is_drag_start==true){
					var e=ev || window.event;
					var x=e.clientX,y=e.clientY,
					_x=x-drag_def.client_x+drag_def.x,
					_y=y-drag_def.client_y+drag_def.y;
					// if(Math.abs(_x)>d.limit.min_x){
					// 	_x=_x<0?-d.limit.min_x:d.limit.min_x;
					// }
					// if(Math.abs(_y)>d.limit.min_y){
					// 	_y=_y<0?-d.limit.min_y:d.limit.min_y;
					// }

					p.style.left=_x+"px";
					p.style.top=_y+"px";
				}
			};
			// 拖拽结束
			function endDrag(ev){
				is_drag_start=false;
				d.out_data.pos_x=parseInt(a.getStyle(p,"left"));
				d.out_data.pos_y=parseInt(a.getStyle(p,"top"));
			};


			/*滚轮放大*/
			var last_y=0,new_times=0;
			a.addEvent(m,"mousewheel",scrollZoom);
			function scrollZoom(ev){
				var e=ev || window.event;
				var wheel_delta=getWheelValue(e);
				var k=wheel_delta<0?d.k2:-d.k2;
				var _y=d.y;
				_y+=k;
				if(_y<0){
					_y=0;
				}else if(_y>d.line){
					_y=d.line;
				}
				d.y=_y;
				setZoomFunc();
				a.stopDefault(ev);
				a.stopBubble(ev);
			};
			//取得滚动值 
			function getWheelValue(e){ 
				return ( e.wheelDelta ? e.wheelDelta/120 : -( e.detail%3 == 0 ? e.detail/3 : e.detail ) ) ; 
			};
			function reSetStateFunc(){
				is_drag_start=false;
				is_start_ratio=false;
			};
			function setStartSty(){		//初始化位置
				clearTimeout(timer);
				if(d.is_load_img==false || d.is_load_img2==false){
					timer=setTimeout(setStartSty,200);
				}else{
					d.y=0.5*d.line;
					setZoomFunc();
					setImgPosition();
				}
			};
			function setImgPosition(){		//设置图片位置
				var nw=d.width,nh=d.height;
				if(nw<d.bw){
					p.style.left=(d.bw-nw)/2+"px";
					endDrag();
				}
				if(nh<d.bh){
					p.style.top=(d.bh-nh)/2+"px";
					endDrag();
				}
			};
		},

		/*---------------绑定事件-----------------*/
		addEvent: function(obj,type,func){					// 事件绑定
			// obj==目标对象，type==事件,func==绑定的函数
			if(obj.addEventListener){
				obj.addEventListener(type,func,false);
			}else if(obj.attachEvent){
				// ie
				obj.attachEvent("on"+type,func);
			}else{
				obj.on[type]=func;
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
			}else{
				window.event.cancelBubble=true;
			}
			return false;
		},
		stopDefault: function(ev){					// 阻止浏览器默认事件
			var e=ev || window.event;
			if(e && e.preventDefault){
				e.preventDefault();
			}else{
				window.event.returnValue=false;
			}
			return false;
		},
		getStyle:function(obj,name){					// 获取样式----------ie7需要单独处理
			if(obj.currentStyle){
				return obj.currentStyle[name];
			}else{
				return getComputedStyle(obj,false)[name];
			}
		},
		getEle:function(str,op){											//获取元素
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
		}
	};
	g.setPattern=setPattern;
}(window);