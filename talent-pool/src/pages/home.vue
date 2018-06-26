<template>
    <div>
    	<p>{{msg}}</p>
    	<router-link to='/list'>立即进入》</router-link>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return{msg: '欢迎来的极地人才库'}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
