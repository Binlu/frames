/*
	#author		lut000
	#date 		2018/06/13
*/
define([],function(){
	
	var fn={
		container:null,
		canvas:null,
		ctx:null,
		def:{
			ow:0,
			oh:0,
			border_width:1,										//box边框宽度
			limit_number:10,									//限制boxs的个数
			drag_index:1000,									//拖拽时图案的z-index

			now_tag:null,										//当前拖拽对象
			can_operate:false,									//是否可以拖拽
		},
		data:{													//数据
			boxs:[]
		},


		drawLine:function(){
			this.ctx.beginPath();
			this.ctx.moveTo(0,0);
			this.ctx.lineTo(400,200);
			this.ctx.strokeStyle="#fff";
			this.ctx.stroke();
		},
		refresh:function(){										//更新窗口大小
			this.updateView();
		},
		setSize:function(){										//设置画布大小
			var pw=document.documentElement.clientWidth;
			var ph=document.documentElement.clientHeight;
			this.container.style.width=pw+'px';
			this.container.style.height=ph+'px';
			this.canvas.width=pw;
			this.canvas.height=ph;
			this.def.ow=pw;
			this.def.oh=ph;
		},

		setDom:function(container,canvas){
			this.container=container;
			this.canvas=canvas;
			this.ctx=canvas.getContext('2d');
		},

		init:function(container,canvas){										//初始化
			
			this.setDom(container,canvas);
			this.setSize();
			this.updateView();
			this.bindFunc();
		},	

		bindFunc:function(){									//绑定事件

			var self=this,boxs=self.data.boxs;
			var list=document.querySelector('.js-recommend-list');
			var container=this.container;

			// 添加图案
			list.addEventListener('click',function(event){
				var tag=event.target;
				if(tag.nodeName.toUpperCase()=='IMG'){
					var id=tag.parentNode.getAttribute('data-id') || '';
					var src=tag.getAttribute('src') || '';
					if(id!='' && src!=''){

						self.addBox(id,src);
					}
				}
			});

			// 绑定拖拽
			var drag_info={
				rx:0,
				ry:0,
				is_drag:false
			};

			// 选择要操作的框
			container.addEventListener('click',methodCheck,false);
			// 开始拖拽
			container.addEventListener('mousedown',methodCheck,false);
			// 拖拽中
			container.addEventListener('mousemove',methodCheck,false);
			container.addEventListener('mouseup',methodCheck,false);


			function methodCheck(event){													//事件分发
				var tag=event.target;
				var type=event.type;
				if(tag.className!=undefined){
					if(tag.className.indexOf('js-drag-box')!=-1){
						// 框的事件
						if(type=='click'){
							setNowTag(event);
						}else if(type=='mousedown'){
							dragDown(event);	
						}else if(type=='mousemove' && drag_info.is_drag==true){
							dragMove(event);
						}else if(type=='mouseup'){
							dragUp(event);
						}
					}else if(tag.className.indexOf('js-close-box')!=-1){
						// 删除框事件
						if(type=='click'){
							deleteBox(event);
						}
						
					}
					
				}else{
					if(type=='mouseup'){
						dragUp(event);
					}else if(type=='click'){
						self.def.can_operate=false;
						if(self.def.now_tag!=null){
							self.def.now_tag.classList.remove('can-drag');
							self.def.now_tag=null;
						}
					}
				}

				
			};



			function setNowTag(event){												//当前操作对象
                var tag=event.target;
                
                self.container.querySelectorAll('.js-drag-box').forEach(function(item){
                	if(item.className.indexOf('can-drag')!=-1){
                		item.classList.remove('can-drag');
                	}
                });
                tag.classList.add('can-drag');
                self.def.now_tag=tag;
                self.def.can_operate=true;
            };
            function dragDown(event){												//开始拖拽
                var tag=event.target;

                if(tag!=self.def.now_tag){
                	return;
                }

				tag.classList.add('drag-now');       
				if(self.def.can_operate==true){
					drag_info.is_drag=true;
					self.def.now_tag=tag;
					drag_info.rx = event.clientX - tag.offsetLeft;
                	drag_info.ry = event.clientY - tag.offsetTop;
				}      
                
            };
            //为document绑定一个onmousemove事件
            function dragMove(event){												//拖拽中

            	var tag=event.target;
            	var x=event.clientX - drag_info.rx;			
            	var y=event.clientY - drag_info.ry;			

                self.updateView({x:x,y:y});
            };
                
            function dragUp(event){													//结束拖拽
            	drag_info.is_drag=false;
            	if(self.def.now_tag!=null){
            		self.def.now_tag.classList.remove('drag-now');
            	}
            };

            function deleteBox(event){												//删除框
            	var tag=event.target.parentNode;
            	self.def.now_tag=null;
            	self.def.can_operate=false;
            	var id=tag.getAttribute('data-id');
            	console.log(boxs.length)
            	boxs.forEach(function(item,index){
            		if(item.id==id){
            			boxs.splice(index,1);
            		}
            	});
            	self.container.removeChild(tag);

            	self.updateView();
            };
               


			// 绑定监听
			window.addEventListener('resize',function(){
				self.setSize();
				self.refresh();
			},false);
		},

		addBox:function(id,src){									//新增图案
			var self=this;
			if(self.data.boxs.length>self.def.limit_number){return;}
			var img=new Image(),nbox=null;
			img.addEventListener('load',function(){
				nbox=self.setBox(id,img);
				self.data.boxs.push(nbox);
				
				self.updateView();

			},false);
			img.src=src;
		},

		setBox:function(id,img){									//创建一个新的框
			var nindex=this.data.boxs.length;
			var ow=this.def.ow;
			var oh=this.def.oh;


			var box={
				img:img,
				id:id+nindex,										//box的id
				zindex:nindex,										//box的层级
				x:(ow-img.width)/2,									//box距离原点（左上角）的x轴位置
				y:(oh-img.height)/2,								//box距离原点（左上角）的y轴位置
				ow:img.width,										//box原始宽度
				oh:img.height,										//box原始高度
				rotate:0,											//box的旋转角度（°）
				scale:1,											//box当前的缩放比例
			}
			console.log(box);
			// this.limitSize(box);
			console.log(box);
			this.setDiv(box);

			return box;
		},

		limitSize:function(box){									//检测box大小
			var ow=this.def.ow;
			var oh=this.def.oh;

			var k1=ow/oh;
			var k2=box.ow/box.oh;
			var nw=box.ow*box.scale;
			var nh=box.oh*box.scale;
			if(k1>k2){
				if(nh>oh){
					nh=oh;
					nw=nh/k2;
					box.ow=nw;
					box.oh=nh;
					box.x=(ow-nw)/2;
					box.y=(oh-nh)/2;
					box.scale=nh/box.oh;
				}
			}else{
				if(nw>ow){
					nw=ow;
					nh=nw*k2;
					box.ow=nw;
					box.oh=nh;
					box.x=(ow-nw)/2;
					box.y=(oh-nh)/2;
					box.scale=nw/box.ow;
				}
			}
			return box;
		},


		setDiv:function(box){										//创建浮层
			var ediv=document.createElement('div');
			var ebutton=document.createElement('button');
			var espan=document.createElement('span');

			ediv.className='js-drag-box drag-box can-drag';
			ediv.setAttribute('data-id',box.id);
			ediv.style.cssText='z-index:'+box.zindex+';left:'+(box.x-this.def.border_width)+'px;top:'+(box.y-this.def.border_width)+'px;width:'+box.ow*box.scale+'px;height:'+box.oh*box.scale+'px;transfrom:rotateZ('+box.rotate+'deg)';
			ebutton.className='js-close-box';
			ediv.appendChild(ebutton);
			ediv.appendChild(espan);
			this.container.appendChild(ediv);
			this.def.now_tag=ediv;
			this.def.can_operate=true;
		},
		updateView:function(opt){									//更新视图
			if(opt!=undefined){
				this.draw(opt);	
			}else{
				this.draw();
			}
		},

		draw:function(opt){											//画图
			var self=this;
			this.drawLine();
			var boxs=this.data.boxs;
			var ow=this.def.ow;
			var oh=this.def.oh;
			this.ctx.clearRect(0,0,ow,oh);


			if(self.def.now_tag!=null){
				var id=self.def.now_tag.getAttribute('data-id') || '';
				boxs.forEach(function(item){
					if(id==item.id){
						for(var key in opt){
							item[key]=opt[key];
						}
						self.setView(item,self.def.now_tag);
					}else{
						self.setView(item);
					}
				});
			}else{
				boxs.forEach(function(item){
					self.setView(item);
				});
			}
		},

		setView:function(item,tag){										//显示试图
			this.ctx.save();
			var x=item.x,y=item.y,nw=item.ow*item.scale,nh=item.oh*item.scale;
			this.ctx.drawImage(item.img,x,y,nw,nh);
			this.ctx.restore();
			if(tag){
				tag.style.cssText='z-index:'+item.zindex+';left:'+(x-this.def.border_width)+'px;top:'+(y-this.def.border_width)+'px;width:'+nw+'px;height:'+nh+'px;transfrom:rotateZ('+item.rotate+'deg)';
			}
		}
	};


	return fn;	
});