<template>
    <div class="detail-box">
        <h3>基本信息</h3>
        <div class="row">
            <div class="col-md-3">
                <img class="head-pic" :src="item.pic" alt="">
            </div>
            <div class="row col-md-9">
                <div class="col-md-4">
                    姓名：***
                </div>
                <div class="col-md-4">
                    学历：本科
                </div>
                <div class="col-md-4">
                    专业：经济管理
                </div>
                <div class="col-md-4">
                    毕业院校：上海交大
                </div>
                <div class="col-md-4">
                    民族：汉
                </div>
                <div class="col-md-4">
                    籍贯：上海
                </div>
                <div class="col-md-4">
                    现居地：上海
                </div>
            </div>
        </div>


        <h3>职业信息</h3>
        <div class="row">
            <div class="col-md-6">
                职位：web前端开发
            </div>
            <div class="col-md-6">
                级别：高级
            </div>

            <div class="col-md-6">
                工作经验：5年
            </div>
            <div class="col-md-6">
                擅长：js
            </div>

            <div class="col-md-6">
                上次入职时间：2017/05/20
            </div>
            <div class="col-md-6">
                是否离职：是
            </div>
            <div class="col-md-6">
                求职意向：强
            </div>
            <div class="col-md-6">
                是否稳定：是
            </div>
            <div class="col-md-6">
                目前公司：上海汽车
            </div>

        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    export default {
        name: 'detail',
        data () {
            return{
                info_data:{}
            }
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
            console.log(this.$route.params.id)
            console.log(this.item)
        },
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .detail-box{padding: 20px;border: 1px solid #dedede;}
    .detail-box>h3{padding: 10px;margin-bottom: 15px;background-color: #aaa;}
    .head-pic{width: 180px;height: 240px;}
</style>
