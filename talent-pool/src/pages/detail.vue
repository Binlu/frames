<template>
    <div>
    	
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'detail',
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
