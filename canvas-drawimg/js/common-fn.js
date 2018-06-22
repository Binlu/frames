/*
	#author		lut000
	#date 		2018/06/13
*/


require.config({
    paths:{
        'rotate-origin':['origin-set']
    },
    shim:{
        'rotate-origin':{
            exports:'rotate_fn'
        },
    }
});


define(['rotate-origin'],function(rotate_fn){
	
	var fn={
		container:null,
		canvas:null,
		ctx:null,
		def:{
			ow:0,
			oh:0,
			border_width:1,										//box边框宽度
			limit_number:10,									//限制boxs的个数
			min_scale:0.2,										//最小缩放比例
			max_scale:2.5,										//最大缩放比例
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

			var self=this,boxs=self.data.boxs,d=self.def;
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
			container.addEventListener('click',methodCheckClick,false);
			// 开始拖拽
			container.addEventListener('mousedown',methodCheckDown,false);
			// 拖拽中
			container.addEventListener('mousemove',methodCheckMove,false);
			container.addEventListener('mouseup',methodCheckUp,false);

			function methodCheckClick(event){												//点击事件
				var tag=event.target;
				if(tag.className!=undefined){
					// 有class点击对象
					if(tag.className.indexOf('js-drag-box')!=-1){
						setNowTag(event);
					}else if(tag.className.indexOf('js-close-box')!=-1){
						deleteBox(event);
					}else if(tag.className.indexOf('js-origin-btn')!=-1){
						
					}else{
						resetStatus(event);
					}
				}else{
					// 无class点击对象
				}
			};
			function methodCheckDown(event){												//鼠标按下
				var tag=event.target;
				if(tag.className!=undefined){
					// 有class点击对象
					if(tag.className.indexOf('js-drag-box')!=-1){
						dragDown(event);
					}else if(tag.className.indexOf('js-close-box')!=-1){
						
					}else if(tag.className.indexOf('js-origin-btn')!=-1){
						rotateStart(event);
					}else{
						
					}
				}else{
					// 无class点击对象
				}
			};
			function methodCheckMove(event){												//鼠标移动
				var tag=event.target;
				if(drag_info.is_drag==true){
					if(tag.className!=undefined && tag.className.indexOf('js-drag-box')!=-1){
						dragMove(event);
					}
				}else if(origin_info.is_drag==true){
					rotateMove(event);
				}
			};

			function methodCheckUp(event){													//鼠标放开
				if(drag_info.is_drag==true){
            		drag_info.is_drag=false;
            	}
            	if(origin_info.is_drag==true){
            		origin_info.is_drag=false;
            		origin_info.box=null;
            	}
			};
			function resetStatus(event){													//更新操作对象

				if(d.now_tag!=null){
            		d.now_tag.classList.remove('drag-now','can-drag');
            		d.now_tag=null;
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
                d.now_tag=tag;
                d.can_operate=true;
            };
            function dragDown(event){												//开始拖拽
                var tag=event.target;

                if(tag!=d.now_tag){
                	return;
                }

				tag.classList.add('drag-now');       
				if(d.can_operate==true){
					drag_info.is_drag=true;
					d.now_tag=tag;
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
                

            function deleteBox(event){												//删除框
            	var tag=event.target.parentNode;
            	d.now_tag=null;
            	d.can_operate=false;
            	var id=tag.getAttribute('data-id');
            	boxs.forEach(function(item,index){
            		if(item.id==id){
            			boxs.splice(index,1);
            		}
            	});
            	self.container.removeChild(tag);

            	self.updateView();
            };
            


            // 绑定旋转
            var origin_info={
            	is_drag:false,
            	rx:0,
            	ry:0,
            	ox:0,										//中心点x坐标
            	oy:0,										//中心点y坐标
            	mx:0,
            	my:0,
            	scale:1,
            	start_deg:0,
            	diagonal:0,									//对角线长度
            	k:0,										//k=box.oh/box.ow
            	abs_deg:0,
            	box:null,

            	rk:Math.PI/180
            };
            function rotateStart(event){															//开始旋转
                var tag=event.target,par=tag.parentNode;
                var box=self.getBox(par.getAttribute('data-id'));
                if(d.can_operate==true){
					origin_info.is_drag=true;
					d.now_tag=par;
					// 中心点坐标
                	origin_info.ox = box.x+box.ow*box.scale/2;
                	origin_info.oy = box.y+box.oh*box.scale/2;

                	if(box.mx!=undefined){
						origin_info.rx = event.clientX-box.mx-origin_info.ox;
						origin_info.ry = event.clientY-box.my-origin_info.oy;
					}else{
						origin_info.rx = event.clientX - (box.x+box.ow*box.scale);
						origin_info.ry = event.clientY - (box.y+box.oh*box.scale);
					}

                	origin_info.start_deg=Math.atan2(box.oh*-1,box.ow);

                	origin_info.diagonal=Math.sqrt(Math.pow(box.ow,2)+Math.pow(box.oh,2));
                	origin_info.k=box.oh/box.ow;
				}

				origin_info.box=box;
                
                
	        };
            
            function rotateMove(event){															//选择监听
            	var box=origin_info.box,pnx=1,pny=1;
                // // 相对中心点位移
                origin_info.mx = event.clientX - origin_info.rx - origin_info.ox;
                origin_info.my = event.clientY - origin_info.ry - origin_info.oy;
                pnx=origin_info.mx>0?1:-1;
                pny=origin_info.my>0?1:-1;
                // 放大比例
                origin_info.scale = Math.sqrt(Math.pow(origin_info.mx*2,2)+Math.pow(origin_info.my*2,2))/origin_info.diagonal;

                // 限制变换大小
                if(origin_info.scale>d.max_scale || origin_info.scale<d.min_scale){
                	origin_info.scale=origin_info.scale>d.max_scale?d.max_scale:d.min_scale;
                	return;
                }

                //旋转角度
                var Q=Math.atan2(origin_info.my*-1,origin_info.mx);
                var now_roate = (Q - origin_info.start_deg) * 180/Math.PI*-1;

                // 计算新的x,y
                var x=origin_info.ox-box.ow*origin_info.scale/2;
                var y=origin_info.oy-box.oh*origin_info.scale/2;

                // 记录相对于中心点位移
                box.mx=origin_info.mx;
                box.my=origin_info.my;

                // 更新数据
                self.updateView({
                	x:x,
                	y:y,
                	scale:origin_info.scale,
                	rotate:now_roate
                });
                
            };



			// 绑定监听
			window.addEventListener('resize',function(){
				self.setSize();
				self.refresh();
			},false);
		},

		addBox:function(id,src){									//新增图案
			var self=this,d=self.def;
			if(self.data.boxs.length>d.limit_number){return;}
			var img=new Image(),nbox=null;
			img.addEventListener('load',function(){
				nbox=self.setBox(id,img);
				self.data.boxs.push(nbox);
				
				self.updateView();

			},false);
			img.src=src;
		},
		getBox:function(id){										//查询box
			var boxs=this.data.boxs;
			for(var i=0,len=boxs.length;i<len;i++){
				if(id==boxs[i].id){
					return boxs[i];
				}
			}
		},
		cloneBox:function(box){										//克隆box
			var o={};
			for(var key in box){
				o[key]=box[key];
			}
			return o;
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
			// this.limitSize(box);
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
			ediv.style.cssText='z-index:'+box.zindex+';left:'+(box.x-this.def.border_width)+'px;top:'+(box.y-this.def.border_width)+'px;width:'+box.ow*box.scale+'px;height:'+box.oh*box.scale+'px;transform:rotateZ('+box.rotate+'deg)';
			ebutton.className='js-close-box';
			espan.className='js-origin-btn';
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
			var self=this,d=self.def;
			this.drawLine();
			var boxs=this.data.boxs;
			var ow=this.def.ow;
			var oh=this.def.oh;
			this.ctx.clearRect(0,0,ow,oh);


			if(d.now_tag!=null){
				var id=d.now_tag.getAttribute('data-id') || '';
				boxs.forEach(function(item){
					if(id==item.id){
						for(var key in opt){
							item[key]=opt[key];
						}
						self.setView(item,d.now_tag);
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
			
			var x=item.x.toFixed(1)*1,y=item.y.toFixed(1)*1,nw=(item.ow*item.scale).toFixed(1)*1,nh=(item.oh*item.scale).toFixed(1)*1;
			var ox=x+nw/2;
			var oy=y+nh/2;
			this.ctx.save();
			this.ctx.translate(ox,oy);

			this.ctx.rotate(item.rotate*Math.PI/180);

			this.ctx.translate(-ox,-oy);

			this.ctx.drawImage(item.img,x,y,nw,nh);
			this.ctx.restore();
			if(tag){
				tag.style.cssText='z-index:'+item.zindex+';left:'+(x-this.def.border_width)+'px;top:'+(y-this.def.border_width)+'px;width:'+nw+'px;height:'+nh+'px;transform:rotateZ('+item.rotate+'deg)';
			}
		}
	};


	return fn;	
});