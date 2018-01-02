/*
	*author lut000
	*date   2017/07/25
	*edition calendar-1.0.dev
*/

!function(g){
	var calendar=function(opt){
		if(!opt || typeof opt !="object"){
			console.warn("参数必须为object！");
			return false;
		}else{
			if(!opt.box){
				console.warn("缺少box");
				return false;
			}
		}
		this.box=document.querySelector(opt.box);		//包含框
		this.container=null;							//日历框
		this.day_list=null;								//日期列表
		this.c_year=null;								//年
		this.c_month=null;								//月


		this.def={										//共用变量
			html:'<div class="c-container js-c-container"><div class="c-head js-c-head"><div class="head-t js-head-t"><a class="c-btn js-prev-btn" href="javascript:;" alt="上一月"></a><div class="c-h js-c-h"><span class="js-c-year">2015</span><span>年</span><span class="js-c-month">11</span><span>月</span></div><a class="c-btn js-next-btn" href="javascript:;" alt="下一月"></a></div><div class="head-tt"><ul class="w-list js-w-list"><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul></div><div class="c-mian"><ul class="d-list js-d-list"><li data-str="2015-11-11">1</li></ul></div></div></div>',
			ndate:opt.date?opt.date.replace("-","/"):"",
			year:"",
			month:"",
			day:"",
			today_info:{
				year:"",
				month:"",
				day:""
			},
			tag_info:{
				year:"",
				month:"",
				day:""
			}
		};



		this.init();
	};

	// 原型

	calendar.prototype={
		init:function(){
			var a=this;
			a.setLink();
			a.setMainDom();
			a.getDateDetail();
			a.setDayDom();
			a.bindFunc();
		},

		setLink:function(){
			var link_ele=document.createElement("style");
			link_ele.type="text/css";
			link_ele.innerHTML=".c-container{width:100%;border:1px solid #D2E9FF;}.head-t{padding:10px 15px;text-align:center;color:#3B82C5;background-color:#F3F3F3;}.head-t .c-btn{display:inline-block;width:2em;height:2em;background-color:#D2E9FF;vertical-align:middle;}.c-h{width:80%;display:inline-block;}.head-t .c-btn,.head-t .c-btn:visited,.head-t .c-btn:hover{color:#3B82C5;}.head-tt{background-color:#D2E9FF;}.w-list{padding:1em 0;text-align:center;}.w-list>li{display:inline-block;width:13%;color:#3b82c5;font-weight:bold;}.c-mian{padding:20px 0;background-color:#F3F3F3;}.d-list{min-height:300px;text-align:center;}.d-list>li{display:inline-block;width:13%;padding:1.5em 0;border-left:1px solid #ccc;border-bottom:1px solid #ccc;}.default-item{background-color:#dedede;color:#aaa}.tag-day{background-color:#e45926;color:#fff;}.now-day{background-color:#55acdd;color:#fff;}";

			// document.body.getElementsByTagName("head")[0].
			// document.head
			document.querySelector("head").appendChild(link_ele);
		},

		getDateDetail:function(){		//获取时间属性
			var a=this,d=a.def;
			var ndates=d.ndate!=""?new Date(d.ndate):new Date();
			d.year=ndates.getFullYear();
			d.month=ndates.getMonth()+1;
			d.day=ndates.getDate();

			d.tag_info.year=d.year;
			d.tag_info.month=d.month;
			d.tag_info.day=d.day;

			var today=new Date();
			d.today_info.year=today.getFullYear();
			d.today_info.month=today.getMonth()+1;
			d.today_info.day=today.getDate();
		},
		/*------------事件绑定--------------*/
		bindFunc:function(){
			var a=this,d=a.def,y=d.year,m=d.month;
			
			//上一月
			a.prev_btn.addEventListener("click",prevFunc,false);
			function prevFunc(){
				if(d.month==1){
					d.year--;
					d.month=12;
				}else{
					d.month--;
				}
				a.setDayDom();
			};
			//下一月
			a.next_btn.addEventListener("click",nextFunc,false);
			function nextFunc(){
				if(d.month==12){
					d.year++;
					d.month=1;
				}else{
					d.month++;
				}
				a.setDayDom();
			};
		},
		/*-----------生成dom部分------------*/
		setMainDom:function(){		//生成主框架
			var a=this,b=a.box,d=a.def;
			b.innerHTML=d.html;

			a.container=a.box.querySelector(".js-c-container");
			a.day_list=a.container.querySelector(".js-d-list");
			a.c_year=a.container.querySelector(".js-c-year");
			a.c_month=a.container.querySelector(".js-c-month");
			a.prev_btn=a.container.querySelector(".js-prev-btn");
			a.next_btn=a.container.querySelector(".js-next-btn");
		},
		setDayDom:function(){		//生成日期
			var a=this,d=a.def,y=d.year,m=d.month,dt=d.day,ty=d.tag_info.year,tm=d.tag_info.month,td=d.tag_info.day,ny=d.today_info.year,nm=d.today_info.month,nd=d.today_info.day;
			var _html='',tag=a.day_list,nindex=0;
			var day_len=a.getDayLen(y,m);
			var prev_len=a.getDayLen(m==1?y-1:y,m==1?12:m-1);
			//生成前空位
			var first_day_date=new Date(y+"/"+m+"/1"),first_day_len=first_day_date.getDay();
			for(var fi=0;fi<first_day_len;fi++){
				_html+='<li class="default-item" style="border-top:1px solid #ccc">'+(prev_len-(first_day_len-fi-1))+'</li>';
				nindex++;
			};
			//生成主体日期
			for(var i=0;i<day_len;i++){
				var sty1="",sty2="";
				if(nindex<7){
					sty2="border-top:1px solid #ccc";
					if((nindex+1)%7==0){
						sty1="border-right:1px solid #ccc";
						
					}
				}else{
					if((nindex+1)%7==0){
						sty1="border-right:1px solid #ccc";
						if(nindex<7){
							sty2="border-top:1px solid #ccc";
						}
					}
				}
				
				if(y==ty && m==tm && (i+1)==td){
					if(y==ny && m==nm && (i+1)==nd){
						_html+='<li class="tag-day now-day" data-str="'+y+"/"+a.toDouble(m)+"/"+a.toDouble(dt)+'" style="'+sty1+";"+sty2+'">'+a.toDouble(i+1)+'</li>';
					}else{
						_html+='<li class="tag-day" data-str="'+y+"/"+a.toDouble(m)+"/"+a.toDouble(dt)+'" style="'+sty1+";"+sty2+'">'+a.toDouble(i+1)+'</li>';
					}
				}else{
					if(y==ny && m==nm && (i+1)==nd){
						_html+='<li class="now-day" data-str="'+y+"/"+a.toDouble(m)+"/"+a.toDouble(dt)+'" style="'+sty1+";"+sty2+'">'+a.toDouble(i+1)+'</li>';
					}else{
						_html+='<li data-str="'+y+"/"+a.toDouble(m)+"/"+a.toDouble(dt)+'" style="'+sty1+";"+sty2+'">'+a.toDouble(i+1)+'</li>';
					}
				}
				nindex++;
			};
			//生成后空位
			var last_len=7-(day_len-(7-first_day_len))%7;
			last_len=last_len%7==0?0:last_len;
			for(var j=0;j<last_len;j++){
				if(j==last_len-1){
					_html+='<li class="default-item" style="border-right:1px solid #ccc;">'+a.toDouble(j+1)+'</li>';
				}else{
					_html+='<li class="default-item">'+a.toDouble(j+1)+'</li>';
				}
				
			};
			tag.innerHTML=_html;
			a.c_year.innerHTML=y;
			a.c_month.innerHTML=a.toDouble(m);
		},


		/*----------方法----------*/
		isLeapYear:function(y){
			if(y%100 && y%400){
				return true;
			}else{
				return false;
			}
		},
		toDouble:function(str){
			if(str<10){
				return "0"+str;
			}else{
				return str;
			}
		},
		getDayLen:function(y,m){
			var a=this,day_len=30;
			if(m==1 || m==3 || m==5 || m==7 || m==8 || m==10 || m==12){
				day_len=31
			}else if(m==2 && a.isLeapYear(y)){
				day_len=29
			}else if(m==2 && !a.isLeapYear(y)){
				day_len=28
			}
			return day_len;
		}
	};


	g.calendar=calendar;
}(window);