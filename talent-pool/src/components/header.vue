<template>
	<header class="page-header">
		<section class="container">
			<div class="row">
				<div class="col-md-12">
					<h1>极地-人才库</h1>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<h3>当前位置：人才库>人才列表>详情</h3>
				</div>
			</div>
		</section>
	</header>
</template>


<script>
	export default {
		name:'header-component',
		mounted:function(){
			console.log(this.$router)
		}
	}
</script>