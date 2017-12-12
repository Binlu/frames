图片轮播



依赖jquery


使用介绍：


<script type="text/javascript" src="../global/js/lib/jquery/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="js/loop-play-1.0.js"></script>
<script type="text/javascript">
	$(function(){
		var demo=new loopFunc({
		    "container":"容器，id或者class",					//必填
		    "direction":"轮播方向：horizontal/vertical",		//选填
		    "auto":"是否自动播放：true/false",					//选填
		    "speed":"移动速度：5000ms",							//选填
		    "interval":"运动间隔：5000ms",						//选填
		    "width":"容器宽度",									//选填
		    "height":"容器高度",								//选填
		    "repeat":"是否循环滚动"								//选填
		});
	})
</script>

