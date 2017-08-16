/*
	#author		lut000
	#date 		2017/03/03
*/
require.config({
    baseUrl:"src/js",
    paths:{
        "jquery":["lib/jquery-2.1.4.min"],
        "swiper":["lib/swiper-3.4.2.jquery.min"],
        "msg":["common/pop-msg-mt-1.0"],
        "map":["map"],
        "baidu_api":["http://api.map.baidu.com/getscript?v=2.0&ak=BQtrC7t3SWOnelZPBWPMSSZi&services=&t=20170517145936"]
    },
    shim:{
        "msg":{
            deps:["jquery"],
            exports:"msg"
        },
        "swiper":{
            deps:["jquery"],
            exports:"swiper"
        },
        "map":{
            deps:["baidu_api","jquery"]
        }
    }
});
require(["jquery","swiper","map"],function(jquery,swiper){
    $(function(){
        /*-----------------设置字体大小-----------------*/
        function setRootSize(){         /*字体设置*/
            var ow=document.documentElement.clientWidth || document.body.clientWidth;
            var root_ele=document.getElementsByTagName("html")[0],font_size=20;
            if(ow<320){
                font_size=20;
            }else if(ow>720){
                font_size=40;
            }else{
                font_size=parseInt(ow/(720/40));
            }
            root_ele.style.fontSize = font_size+'px';
        }
        setRootSize();
        $(window).on("resize",function(){
            setRootSize();
        });
        
        /*-----------------方法-----------------*/

        var def={
            is_set_swiper:false
        };
        // 切换页面
        var main_swiper=new swiper(".js-container",{
            direction :'vertical',
            loop: false,
            spaceBetween: 0,
            // nextButton:'.js_next',
            onSlideChangeEnd: function(iswiper){
                if(iswiper.activeIndex==1 && def.is_set_swiper==false){
                    page2_swiper.startAutoplay();
                }else{
                    page2_swiper.stopAutoplay();
                }
                // var j = parseInt(main_swiper.activeIndex);
            },
            onTransitionStart: function(swiper){
                // var j = parseInt(main_swiper.activeIndex);
                //这里可判断当前滑动到哪个产品
                // console.log(j)
            }
        });
        main_swiper.slideTo(3)
        //左右切换图片
        var page2_swiper=new swiper(".js-container2",{
            // direction :'vertical',
            loop: true,
            effect:"cube",
            autoplay:2000,
            cube: {
              slideShadows: true,
              shadow: true,
              shadowOffset: 100,
              shadowScale: 0.6
            },
            spaceBetween: 0,
            // nextButton:'.js_next',
            onSlideChangeEnd: function(swiper){
                // var j = parseInt(main_swiper.activeIndex);
            },
            onTransitionStart: function(swiper){
                // var j = parseInt(main_swiper.activeIndex);
                //这里可判断当前滑动到哪个产品
                // console.log(j)
            }
        });
        page2_swiper.stopAutoplay();



        // 音乐播放
        var audio_ele=document.querySelector(".js-audio-ele");
        var timer=null,num=0;
        $(".js-control-btn").on("click",function(){
            var a=$(this);
            if(!$(this).hasClass("js-now")){
                audio_ele.play();
                $(this).addClass("js-now");
                timer=setInterval(function(){
                    a.css({"transform":"rotate("+num+"deg)"});
                    num++;
                },30);
            }else{
                clearInterval(timer);
                audio_ele.pause();
                $(this).removeClass("js-now");
            }
        });
    });
});