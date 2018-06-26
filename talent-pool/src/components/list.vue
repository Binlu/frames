<template>
    <div>
    	<h1>极地-人才库</h1>
        <p>{{listMsg}}</p>
    	<ul>
            <li>111</li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'home',
        data () {
            return{msg: '欢迎来的极地人才库'}
        },
        computed: {
            ...mapState(['listMsg']),
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
