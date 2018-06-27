<template>
    <div>
    	4234324
        <img :src="item.pic" alt="">
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    export default {
        name: 'detail',
        data () {
            return{msg: '欢迎来的极地人才库'}
        },
        computed: {
            ...mapState(['listMsg']),
            ...mapGetters(['allLists']),
            item(){
                const obj = this.allLists.find( item => item.id == this.$route.params.id );
                return obj;
            }
        },
        methods: {
            ...mapActions(['getLists']),
        },
        created() {
            if(!this.allLists.length){
                this.getLists();  //获取列表数据
            }
        },
        mounted() {
            setTimeout( ()=>{
                console.log(this.$route.params.id)
                console.log(this.item)
            },2000 )
        },
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
