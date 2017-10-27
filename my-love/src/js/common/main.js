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
            is_set_swiper:false,
            nindex:1
        };
        // 切换页面
        var main_swiper=new swiper(".js-container",{
            direction :'vertical',
            loop: false,
            spaceBetween: 0,
            // nextButton:'.js_next',
            onSlideChangeEnd: function(iswiper){
                if(iswiper.activeIndex==1 && def.is_set_swiper==false){
                    setTimeout(function(){
                        page2_swiper.startAutoplay();
                    },1000);
                }else{
                    page2_swiper.stopAutoplay();
                }
                // var j = parseInt(main_swiper.activeIndex);
                def.nindex=iswiper.activeIndex+1;
                setMove(iswiper.activeIndex);
            },
            onTransitionStart: function(swiper){
                // var j = parseInt(main_swiper.activeIndex);
                //这里可判断当前滑动到哪个产品
                // console.log(j)
            }
        });
        // main_swiper.slideTo(2)

        $(".js-next").on("touchstart",function(){
            main_swiper.slideTo(def.nindex);
        });

        //左右切换图片
        var page2_swiper=new swiper(".js-container2",{
            // direction :'vertical',
            loop: true,
            effect:"coverflow",
            autoplay:2000,
            // cube: {
            //   slideShadows: false,
            //   shadow: false,
            //   shadowOffset: 100,
            //   shadowScale: 0.6
            // },
            slidesPerView: 1,
            centeredSlides: true,
            coverflow:{
                rotate: 80,
                stretch: 10,
                depth: 10,
                modifier: 1,
                slideShadows : false
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

        audio_ele.play();
        $(".js-control-btn").addClass("js-now");
        timer=setInterval(function(){
            $(".js-control-btn").css({"transform":"rotate("+num+"deg)"});
            num++;
        },30);

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

    setTimeout(function(){
        setMove(0);
    },1000);

    function setMove(nindex){
        switch(nindex){
            case 0:
                $(".js-next").fadeIn(400);
                $(".js-p1-move1").addClass("move1");
                $(".js-p1-move2").delay(1200).fadeIn(600,function(){
                    $(".js-p1-move3").addClass("move2");
                    $(".js-p1-move4").addClass("move3");
                    $(".js-p1-move5").addClass("move2");
                });
                break;
            case 1:
                $(".js-next").fadeIn(400);
                $(".js-p2-move1").addClass("move2");
                $(".js-container2").delay(500).animate({"opacity":1});
                break;
            case 2:
                $(".js-next").fadeIn(400);
                $(".js-p3-move1").fadeIn(500,function(){
                    $(".js-p3-move2").addClass("move4")
                    $(".js-p3-move3").addClass("move4")
                    $(".js-p3-move4").addClass("move4")
                });
                break;
            case 3:
                $(".js-next").fadeOut(400);
                $(".js-p4-move1").addClass("move5");
                setTimeout(function(){
                    $(".js-p4-move2").addClass("move2");
                    $(".js-p4-move3").addClass("move2");
                },1000)
                break;
        }
    }
});