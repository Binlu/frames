/*
    #author     lut000
    #date       2017/05/04
*/

$(function(){
	// 局部变量
	var def={
		img_rpath:"images/",
		last_index:0,
		is_set_model:false,
		model:null
	};
	// 切换内容列表
	$(".js-pattern-tab-list>li").on("click",function(){
		var nindex=$(this).index();
		$(this).children("img").attr("src",def.img_rpath+"icon"+(nindex+1)+"-active.png");
		$(this).siblings("li.now-choice").each(function(){
			$(this).children("img").attr("src",def.img_rpath+"icon"+(def.last_index+1)+".png");
		});
		$(this).addClass("now-choice").siblings("li").removeClass("now-choice");
		def.last_index=nindex;

	});

	// 点击生成虚拟样衣
	$(".js-pattern-list>li").on("click",function(){
		//if(!$(this).hasClass("now-choice")){
			// 点击列表中条目时获取并暂存当前选中的tab的文字：男装，女装等
            window.pattern_classify_name = $(".pattern-tab-list .now-choice span").text();
			var mark_src=$(this).attr("data-model-src")?$(this).attr("data-model-src"):"";
			var pattern_src=$(this).attr("data-src")?$(this).attr("data-src"):"";
			if(mark_src=="" || pattern_src==""){
				$(".js-pattern-div").hide();
			}else{
				if(document.querySelector){
					$(".js-pattern-div").css({"background-image":"url('"+pattern_src+"')"});
				};
				$(".js-pattern-div").show();
				$(".js-mask-pic").attr("src",mark_src);
				$(".js-pattern-pic").attr("src",pattern_src);
				if(def.is_set_model==false){
					// 生成模型
					def.is_set_model=true;
					def.model=new setPattern();
				}else{
					// 更新模型
					def.model.changePattern();
				}
				
			}
			$(".js-pattern-list>li").removeClass("now-choice");
			$(this).addClass("now-choice");
			def.tpl_id = $(this).data('tpl-id');
		//}
	});
    
	
	//切换图案局部满身
	$(".js-set-type").on("click",function(){
		var type=$(this).attr("data-type");
		if(type==1){
			$(".js-pattern-div").css({"background-repeat":"repeat"});
		}else{
			$(".js-pattern-div").css({"background-repeat":"no-repeat"});
		}
		def.model.changePattern({
			pattern_type:type
		});
	});
	
	//切换添加色
	$(".js-color-area").on("keydown",function(ev){
		if(ev.keyCode==13){
			var txt=$(this).val();
			var re=/^#[0-9,a-f]{3,6}$/g;
			if(re.test(txt)==true){
				def.model.color_layer=txt;
				$(".js-pattern-div").css({"background-color":txt});
			}else{
				alert("颜色值不对");
			}
			
		}
	});
	
    // 页面初始化
    $(".js-pattern-tab-list>li").eq(0).click();
    $(".js-pattern-list>li").eq(0).click();
});