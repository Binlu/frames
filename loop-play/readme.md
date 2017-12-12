图片轮播依赖jquery，

使用介绍：


html部分

<div class="box js-box">
	<ul class="js-page-list">
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>
	<div class="tool-div">
		<button class="prev-btn js-prev">prev</button>
		<button class="next-btn js-next">next</button>
	</div>

	<div class="js-progress-bar">
		<ol></ol>
	</div>
</div>

css 部分

*{margin: 0;padding: 0;}
li{list-style: none;}
.box{
	width: 800px;
	height: 540px;
	margin: 100px auto 0;
	overflow: hidden;
	position: relative;
	text-align: center;
}
.box>ul>li{float: left;line-height: 540px;background-color: #123;color: #fff;}
.tool-div{z-index: 10;position: absolute;left: 0;top: 50%;width: 100%;margin-top: -10px}
.tool-div>button{display: inline-block;padding: 4px 20px;}
.prev-btn{float: left;}
.next-btn{float: right;}


引入js
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

