// 定义滚动
var myScroll = new IScroll('#animate_page',
	{ 
		mouseWheel: true,
		hideScrollbar: true,
		click: true
	}
);
// 定义滚动
var myScroll1 = new IScroll('#form_page',
	{ 
		mouseWheel: true,
		hideScrollbar: true,
		click: true
	}
);


// 城市柜台数据
var res=null;
// 自定义方法
var $m={
	// 分享链接
	share_href: window.location.href,
	// 分享配置
	init_arr:{},
	// 图片地址前缀
	img_url:"images/",
	// 重新布局
	rs: function(){
		var limit=720;
		var dw=document.documentElement.clientWidth;
		var dh=document.documentElement.clientHeight;
		var fw=dw>limit?limit:dw;
    	$("body").css({"font-size":1*fw/360+"em"});
    	if(dw>limit){
    		$("#animate_page").css({"left":(dw-limit)/2+"px"});
    	}
    	myScroll.refresh();
    	myScroll1.refresh();
	},
	// 提示信息
	atten_txt: ["请填写姓名","请填写手机号","请填写正确的手机号","请填写验证码","验证码错误，请重新输入","请选择省份","请选择城市","请选择柜台"],
	// 后台获取信息
	user_arr :{"mobile":"手机","autocode":"验证码","province":"省份","city":"城市","counter":"柜台","cno":"","autocodenew":"","v":1},
	// ajax 请求地址
	ajax_link: ["deal_info","is_set_info"],
	// 居中显示
	toCenter: function(par,obj){
		var ele1=par,
			ele2=obj;
		var pw=ele1.width();
		var ph=ele1.height();
		var ow=ele2.innerWidth();
		var oh=ele2.innerHeight();
		ele2.css({"top":(ph-oh)/2+"px"});
	}
}
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}
	else{
		return getComputedStyle(obj,false)[name];
	}
}
// 提示信息
// 获取连接数据
var link_obj=GetRequest();
var openid=link_obj["openid"]?link_obj["openid"]:"";
// 获取页面url数据
function GetRequest(){ 
    var url = location.search; //获取url中"?"符后的字串 
    var theRequest = new Object(); 
    if (url.indexOf("?") != -1) { 
        var str = url.substr(1); 
        strs = str.split("&"); 
        for(var i = 0; i < strs.length; i ++) { 
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
        }
    } 
    return theRequest; 
};
//表单获焦失焦
$(function(){
	$m.rs();
	// 请求开始
	getUserInfo();
	// 动画实现
	$("#animate_page").on("click",function(){
		$(this).off("click");
		// 钥匙动画开始
		// $(".p1_pic4").addClass("rotate2");
		// var timer1=setTimeout(function(){
			// clearTimeout(timer1);
			// 
			$(".p1_pic3").addClass("transform1");
			var timer=setTimeout(function(){
				clearTimeout(timer);
				$(".p1_pic3").removeClass("transform1");
				// 开始拆封
				$(".p1_pic1").addClass("rotate1");
				timer1=setTimeout(function(){
					clearTimeout(timer1);
					$(".p1_pic1").animate({"height":"-2em"},200,"linear",function(){
						$(".p1_pic1").hide();
						// 移动
						$("#animate_page").delay(200).animate({"top":"100%"},1000,"linear",function(){
							$("#animate_page").hide();
							myScroll.refresh();
    						myScroll1.refresh();
    						loadres(res);
						});
					});
				},500)
			},1800)
			$(".p1_pic2").delay(300).fadeOut(400);
		// },2300);
	});
	// 重新布局
	$(window).resize(function(){
		$m.rs();
	});
	m.setcss({"butbg":"#c9202e"});
	// 手机限制输入字母和汉字
	$(".js_mobile").bind("input propertychange",function(){
		var txt=$(this).val();
		var regx=/\D/g;
		$(this).val(txt.replace(regx,''));
	});
	// // 验证码限制
	// $(".inp5").bind("input propertychange",function(){
	// 	var txt=$(this).val();
	// 	var regx=/\D/g;
	// 	$(this).val(txt.replace(regx,''));
	// });
	// 获取验证码
	$("#checkbut").on("click",function(){
		checkpost($(this),"js_mobile");
	});
	// 产看产品详情
	$(".js_review_btn").on("touchstart click",function(){
		$(".js_close_btn").children("img").attr("src",$m.img_url+"icon4.png");
		$(".rule_pic").hide();
		$(".prod_pic").show();
		$(".flt_div").fadeIn(200);
	});
	// 查看规则
	$("#rule_btn").on("touchstart click",function(){
		$(".js_close_btn").children("img").attr("src",$m.img_url+"icon3.png");
		$(".prod_pic").hide();
		$(".rule_pic").show();
		$(".flt_div").fadeIn(200);
	});
	// 关闭浮层
	$(".js_close_btn").on("touchstart click",function(){
		$(this).parent().fadeOut(400);
	});
	// 提交
	$("#sub_btn").on("click",function(){
		toSub($(this));
	});

	// share
	shareFunc();
});
// 请求数据
function getUserInfo(){
	$.ajax({
		type: "POST",
		url: "http://weapp.wemediacn.com/laneige/newyear/index/index_api",
		data:{"v":1,"openid":openid,"url":$m.share_href},
		dataType: "json",
		success: function(data){
			if(data["status"]==1){
				// 中奖已兑换
				window.location.href="success.html?openid="+openid;
			}else if(data["status"]==2){
				// 没有兑换
				window.location.href="result.html?openid="+openid;
			}else if(data["status"]==3){
				// 未申领
				$("#atten_box").fadeOut(200);
				$("#animate_page").fadeIn(200,function(){
					myScroll.refresh();
				});
				$("#form_page").fadeIn(200,function(){
					myScroll1.refresh();
				});
				res=data["counter"];
				$m.init_arr=data["share"]["info"];
			}else if(data["status"]==4){
				// 参数错误
				$("#atten_box").children(".p2").show().siblings("p").hide();
			}else if(data["status"]==11){
				// 活动结束
				$("#atten_box").children(".p3").show().siblings("p").hide();
			}else if(data["status"]==12){
				// 域名不合法
				msg("您的链接地址不正确，请用官方链接打开。","确定",function(){
					if(typeof WeixinJSBridge!=="undefined"){
						WeixinJSBridge.call( 'closeWindow');
					}else{
						window.close();
					}
				},true);
			}else if(data["status"]==13){
				// 未关注

			}else{
				// 非法入侵
				msg("您的链接地址不正确，请用官方链接打开。","确定",function(){
					if(typeof WeixinJSBridge!=="undefined"){
						WeixinJSBridge.call( 'closeWindow');
					}else{
						window.close();
					}
				},true);
			}
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
            $("#atten_box").children(".p2").show().siblings("p").hide();
        }
	});
}
// 提交函数
function toSub(obj){    
	var _this=obj;
	var input_txt=[];
	var select_txt=[];
	var regx=/1[1-9]+[0-9]{9}/;
	var re_m = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
	$(".user_info").each(function(){
		input_txt.push($(this).val());
		return input_txt;
	});
	$(".select_ele").each(function(){
		select_txt.push($(this).val());
		return select_txt;
	});
	if(input_txt[0]=="" || input_txt[0]==null || input_txt[0]==undefined){
		msg($m.atten_txt[1],800);
	}else if(input_txt[0].length<11 || !regx.test(input_txt[0])){
		msg($m.atten_txt[2],800);
	}else if(input_txt[1]=="" || input_txt[1]==null || input_txt[1]==undefined){
		msg($m.atten_txt[3],800);
	}else if(input_txt[1]!=$m.user_arr["autocodenew"]){
		msg($m.atten_txt[4],800);
	}else if(select_txt[0]=="" || select_txt[0]==null || select_txt[0]==undefined){
		msg($m.atten_txt[5],800);
	}else if(input_txt[1]=="" || input_txt[1]==null || input_txt[1]==undefined){
		msg($m.atten_txt[6],800);
	}else if(select_txt[2]=="" || select_txt[2]==null || select_txt[2]==undefined){
		msg($m.atten_txt[7],800);
	}else{
		_this.off("click");

		_this.children("img").attr("src",$m.img_url+"btn2.png");
		// 赋值
		// $m.user_arr["name"]=input_txt[0];
		$m.user_arr["mobile"]=input_txt[0];
		$m.user_arr["autocode"]=input_txt[1];
		$m.user_arr["province"]=select_txt[0];
		$m.user_arr["city"]=select_txt[1];
		$m.user_arr["counter"]=select_txt[2];
		$m.user_arr["openid"]=openid;
		$m.user_arr["cno"]=$(".store").children("option:selected").attr("data-cno")?$(".store").children("option:selected").attr("data-cno"):"";

		console.log($m.user_arr);
		// 请求开始
		$.ajax({
			type: "POST",
			url: "http://weapp.wemediacn.com/laneige/newyear/index/submitinfo_api",
			dataType: "json",
			data: $m.user_arr,
			success: function(data){
				console.log(data["code"]);
				if(data["code"]==1 || data["code"]==2){
					// 成功
					window.location.href="result.html?openid="+openid;
				}else if(data["code"]==3){
					msg("您提交的信息不完整。","确定");
		            _this.children("img").attr("src",$m.img_url+"btn1.png");
				    _this.on("click",function(){
						toSub(_this);
					});
				}else if(data["code"]==4){
					msg("参数错误。","确定");
		            _this.children("img").attr("src",$m.img_url+"btn1.png");
				    _this.on("click",function(){
						toSub(_this);
					});
				}else if(data["code"]==5){
					msg(data["msg"],"确定");
		            _this.children("img").attr("src",$m.img_url+"btn1.png");
				    _this.on("click",function(){
						toSub(_this);
					});
				}else if(data["code"]==6){
					msg(data["msg"],"确定");
		            _this.children("img").attr("src",$m.img_url+"btn1.png");
				    _this.on("click",function(){
						toSub(_this);
					});
				}else if(data["code"]==7){
					msg(data["msg"],"确定");
		            _this.children("img").attr("src",$m.img_url+"btn1.png");
				    _this.on("click",function(){
						toSub(_this);
					});
				}else if(data["code"]==8){
					msg(data["msg"],"确定");
		            _this.children("img").attr("src",$m.img_url+"btn1.png");
				    _this.on("click",function(){
						toSub(_this);
					});
				}else{
					msg("信息不对，请用合法的链接打开。","确定",function(){
						if(typeof WeixinJSBridge!=="undefined"){
							WeixinJSBridge.call( 'closeWindow');
						}else{
							window.close();
						}
					},true);
				}
			},
			error: function(XMLHttpRequest,textStatus,errorThrown){
	            // 请求失败
	            msg("网络似乎出现了问题，请重试。","确定");
	            _this.children("img").attr("src",$m.img_url+"btn1.png");
			    _this.on("click",function(){
					toSub(_this);
				});
	        }
		});
		
	}
}
// 验证码
function checkpost(obj,input_class){
	var input_txt="";
	var regPartton=/1[1-9]+[0-9]{9}/;
	input_txt=$("."+input_class).val();
	if(input_txt=="" || input_txt==null || input_txt==undefined){
		msg($m.atten_txt[1],800);
	}
	else if(input_txt.length<11 || !regPartton.test(input_txt)){
		msg($m.atten_txt[2],800);
	}
	else{
		obj.off("click");
		// 请求开始
		$.ajax({
			type: "POST",
			url: "http://weapp.wemediacn.com/laneige/newyear/index/register_autocode_api",
			dataType: "json",
			data: {"openid":openid,"mobile":input_txt,"v":1},
			success: function(data){
				if(data["code"]==1){
					console.log("ok");
					var timer=null;
					var seconds=59;
					// 发送验证码后台切入口
					obj.css({"color":"#bf0606"});
					obj.val("已发送(60)");
					timer=setInterval(function(){
						obj.val("已发送("+seconds+")");
						seconds--;
						if(seconds<0){
							clearInterval(timer);
							obj.val("重新发送");
							obj.css({"color":"#acacac"});
							obj.on("click",function(){
								checkpost(obj,"js_mobile");
							});
						}
					},1000);
					$m.user_arr["autocodenew"]=data["yzm"];
				}else if(data["code"]==2){
					msg(data["msg"],"确定");
					clearInterval(timer);
					obj.val("获取验证码");
					obj.css({"color":"#bf0606"});
					obj.on("click",function(){
						checkpost(obj,"js_mobile");
					});
				}else if(data["code"]==3){
					msg(data["msg"],"确定");
					clearInterval(timer);
					obj.val("获取验证码");
					obj.css({"color":"#bf0606"});
					obj.on("click",function(){
						checkpost(obj,"js_mobile");
					});
				}else{
					msg("网络似乎出现了问题，请重试。","确定");
					clearInterval(timer);
					obj.val("获取验证码");
					obj.css({"color":"#bf0606"});
					obj.on("click",function(){
						checkpost(obj,"js_mobile");
					});
				}
			},
			error: function(XMLHttpRequest,textStatus,errorThrown){
	            // 请求失败
	            msg("网络似乎出现了问题，请重试。","确定");
				clearInterval(timer);
				obj.val("获取验证码");
				obj.css({"color":"#bf0606"});
				obj.on("click",function(){
					checkpost(obj,"js_mobile");
				});
	        }
		});
	}
}
// 获得城市柜台数据
var r;
var rsprov="";
var rscity="";
function loadres(res){
	r=res;
	var str='<option value="" selected disabled>省份</option>';
	for(var i=0;i<r.length;i++){
		if(i==0||r[i].prov!==r[i-1].prov){
			str+='<option value="'+r[i].prov+'">'+r[i].prov+'</option>';
		}
	}
	$(".prov").html(str).bind("change",toselcity);
	var geolocation=new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus()==BMAP_STATUS_SUCCESS){
			var mk=new BMap.Marker(r.point);
			var theurl="http://api.map.baidu.com/geocoder/v2/?ak=5ZmIO6bXbDtdllzdMZwfXmFm&location="+r.point.lat+","+r.point.lng+"&output=json&pois=0";
			 $.ajax({type:"POST",url:theurl,dataType:'jsonp',
				success: function(response){  
					var res2=response.result;
					var ac=res2.addressComponent;
					rsprov=ac.province;
					rscity=ac.city;
					var s1tip=0;
					var s1="";
					for(var i=0;i<res.length;i++){
						if(i==0||res[i].prov!==res[i-1].prov){
							if(res[i].prov.indexOf(rsprov)>=0||rsprov.indexOf(res[i].prov)>=0){
								s1tip=1;
								s1+='<option value="'+res[i].prov+'" selected>'+res[i].prov+'</option>';
							}else{
								s1+='<option value="'+res[i].prov+'">'+res[i].prov+'</option>';
							}
						}
					}
					
					if(s1tip==1){
						s1='<option value="" disabled>省份</option>'+s1;
					}else{
						s1='<option value="" disabled selected>省份</option>'+s1;
					}
					$(".prov").html(s1);
					var s2tip=0;
					var s2='';
					for(var i=0;i<res.length;i++){
						var x=(i-1);
						if(x<0){x=0}
						if((i==0&&res[i].prov==$(".prov").val())||(res[i].city!==res[x].city&&res[i].prov==$(".prov").val())){
							if(res[i].city.indexOf(rscity)>=0||rscity.indexOf(res[i].city)>=0){
								s2tip=1;
								s2='<option value="'+res[i].city+'" selected>'+res[i].city+'</option>';
							}else{
								s2='<option value="'+res[i].city+'">'+res[i].city+'</option>';
							}
						}
					}
					if(s2tip==1){
						s2='<option value="" disabled>城市</option>'+s2;
					}else{
						s2='<option value="" disabled selected>城市</option>'+s2;
					}
					$(".city").html(s2);
					if(s2tip==1){
						toselstore();
					}
				}
			}); 
		}     
	},{enableHighAccuracy:true});
}
function toselcity(){
	var str='<option value="" selected disabled>城市</option>';
	for(var i=0;i<r.length;i++){
		var x=(i-1);
		if(x<0){x=0}
		if((i==0&&r[i].prov==$(".prov").val())||(r[i].city!==r[x].city&&r[i].prov==$(".prov").val())){
			str+='<option value="'+r[i].city+'">'+r[i].city+'</option>';
		}
	}
	$(".city").html(str).bind("change",toselstore);
	$(".store").html('<option value="" selected disabled>柜台</option>');
}
function toselstore(){
	var str='<option value="" selected disabled>柜台</option>';
	for(var i=0;i<r.length;i++){
		if(r[i].city==$(".city").val()){
			str+='<option value="'+r[i].store+'" data-cno="'+r[i]["cno"]+'">'+r[i].store+'</option>';
		}
	}
	$(".store").html(str);
}
/*----------------微信分享-----------------*/
//
var tmpdebug = false;
	var tmpjsapilist = [
						"onMenuShareTimeline",
						"onMenuShareAppMessage"
					];
// 分享函数
function shareFunc(){
	var storename = 'laneigenewyear'+window.location.href.split('#')[0];
	var storeval = store.get(storename);
	var ndata=$m.init_arr;
	if(storeval==undefined || storeval =='' ){
		store.set(storename,JSON.stringify(ndata));
        wx.config({
	        debug:tmpdebug,
	        appId: ndata.appid,
			timestamp: ndata.timestamp,
			nonceStr: ndata.nonceStr,
			signature: ndata.signature,
			jsApiList: tmpjsapilist
		});
	}else{
		storeval = JSON.parse(storeval);
		wx.config({
	        debug:tmpdebug,
	        appId: storeval.appid,
			timestamp: storeval.timestamp,
			nonceStr: storeval.nonceStr,
			signature: storeval.signature,
			jsApiList: [
				"onMenuShareTimeline",
				"onMenuShareAppMessage"
			]
		});
	}
}
wx.ready(function(){

	wx.onMenuShareTimeline({
	    title: '#致青春# 年轻肌肤的秘密等你开启！', // 分享标题
	    link: "http://cdn.wemediacn.com/webpage_laneige/api/CoverService.aspx?r_url=http://weapp.wemediacn.com/laneige/newyear/first/index.html", // 分享链接
	    imgUrl: "http://bos.bj.baidubce.com/we-sh2/laneige/yun/newyear/first/images/share.jpg", // 分享图标
	    success: function () { 
	    	// 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	    	// 用户取消分享后执行的回调函数
	    }
	});
	wx.onMenuShareAppMessage({
	    title: '#致青春# 年轻肌肤的秘密等你开启！', // 分享标题
	    desc: '#致青春# 年轻肌肤的秘密等你开启！', // 分享描述
	    link: "http://cdn.wemediacn.com/webpage_laneige/api/CoverService.aspx?r_url=http://weapp.wemediacn.com/laneige/newyear/first/index.html", // 分享链接
	    imgUrl: "http://bos.bj.baidubce.com/we-sh2/laneige/yun/apply_infos/apply_infos_5/images/share.jpg", // 分享图标
	    type: 'link', // 分享类型,music、video或link，不填默认为link
	    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	    success: function () { 
	        // 用户确认分享后执行的回调函数
	    },
	    cancel: function () { 
	        // 用户取消分享后执行的回调函数
	    }
	});
});
