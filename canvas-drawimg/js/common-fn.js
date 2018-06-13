/*
	#author		lut000
	#date 		2018/06/13
*/
define([],function(){
	
	var fn={
		container:null,
		canvas:null,
		ctx:null,

		data:{													//数据
			boxs:[
				{
					id:1,										//box的id唯一
					zindex:1,									//box的层级
					x:0,										//box距离原点（左上角）的x轴位置
					y:0,										//box距离原点（左上角）的y轴位置
					ow:200,										//box原始宽度
					oh:180,										//box原始高度
					rotate:30,									//box的旋转角度（°）
					scale:1,									//box当前的缩放比例
				}
			]
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

			var self=this;

			// 绑定监听
			window.addEventListener('resize',function(){
				self.setSize();
				self.refresh();
			},false);
		},

		setDivPosition:function(){								//定位浮层位置

		},
		updateView:function(){									//更新视图
			this.setDivPosition();
			this.draw();
		},

		draw:function(){										//画图
			this.drawLine();
		}
	};


	return fn;	
});