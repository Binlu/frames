<template>
    <div class="detail-box">
        <h3>基本信息</h3>
        <div class="row">
            <div class="col-md-3">
                <button id="upload-file"><img class="head-pic" :src="item.pic" alt=""></button>
            </div>
            <div class="row col-md-9">
                <div class="col-md-6">
                    <label>姓名：</label>
                    <input  v-model="item.name" placeholder="请输入姓名">
                </div>
                <div class="col-md-6">
                    <label>学历：</label>
                    <input v-model="item.xueli" placeholder="请输入学历">
                </div>
                <div class="col-md-4">
                    <label>专业：</label>
                    <input v-model="item.zhuanye" placeholder="请输入专业">
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

        <div class="row">
            <div class="col-md-12">
                <button class="btn" @click=subFunc(this)>提交</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import 'layui-src/dist/layui.all'
    import 'layui-src/dist/css/layui.css'
    export default {
        name: 'add',
        data () {
            return{
                info_data:{}
            }
        },
        computed: {
            ...mapState(['listMsg']),
            ...mapGetters(['allLists']),
            item(){

                const obj = this.allLists.find( item => item.id == this.$route.params.id ) || {};
                return obj;
            }
        },
        methods: {
            ...mapActions(['getLists']),
            subFunc:function(){
                console.log(this.item)
            }
        },
        created() {
            if(this.$route.query.id!=undefined){
                if(!this.allLists.length){
                    this.getLists();  //获取列表数据
                }
            }
        },
        updated(){
        },
        mounted() {

            // 绑定事件
            layui.use('upload', function(){
                var upload = layui.upload;
               
                //执行实例
                var uploadInst = upload.render({
                    elem: '#upload-file' //绑定元素
                    ,url: '/upload/' //上传接口
                    ,done: function(res){
                        //上传完毕回调
                    }
                    ,error: function(){
                        //请求异常回调
                    }
                });
            });
        },
        
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .detail-box{padding: 20px;border: 1px solid #dedede;}
    .detail-box>h3{padding: 10px;margin-bottom: 15px;background-color: #aaa;}
    .head-pic{width: 180px;height: 240px;}
</style>
