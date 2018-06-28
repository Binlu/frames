<template>
    <div class="list-section">
        <div class="search">

            <router-link to="/add">去添加我的人才</router-link>

            <input @keydown.13="listSearch" v-model="words" type="text" class="form-control" id="exampleInputPassword1" placeholder="请按照学校，行业 搜索人才">
            <button @click="listSearch" class="btn btn-primary" type="button">搜索</button>
        </div>
    	<div class="content" v-if="allLists.length">
            <ul >
                <li v-for="(item, n) in searchList" :key="n" v-if="n > pageIndex*pageLen && n <= pageIndex*(pageLen)+pageLen">
                    <router-link :to="'/detail/'+item.id">
                        <img :src="item.pic" alt="">
                        <p>
                            <span>学校： </span> {{item.scholl}}<br/>
                            <span>经验： </span> {{item.years+'年'}}<br/>
                            <span>行业： </span> {{item.major}}<br/>
                            {{n}}

                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div style="text-align:center" v-show="nullShow">
            抱歉，您搜索的人才暂时没有!!!
        </div>
        <!-- 分页 -->
        <div v-show="searchList.length" id="page1"></div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import 'layui-src/dist/css/layui.css'
    import layUi from 'layui-src/dist/layui.all'

    
    export default {
        name: 'home',
        data () {
            return{
                words: '',
                searchWord: '',
                isSearch: false,

                pageLen: 8,
                pageIndex: 0
            }
        },
        mounted() {
            // 不是第一次进入该页面数据缓存但重新加分页
            if(this.searchList && this.searchList.length){
                this.setPage()
            }
        },
        computed: {
            // ...mapState(['lists']),
            ...mapGetters(['allLists']),
            searchList(){
                const {searchWord} = this;
                const arr = this.allLists.filter(obj => {
                    return !searchWord || (obj.major.indexOf(searchWord) !==-1 || obj.scholl.indexOf(searchWord) !==-1 )
                })
                this.pageIndex=0;   //变化后从第一页渲染
                return arr;
            },
            nullShow(){     //列表筛选的变化了更新搜索结果状态和 分页状态
                const {isSearch, searchList} = this;
                this.pageIndex=0;
                this.setPage();
                return (isSearch==true && searchList.length<=0)
            }
        },
        
        methods: {
            ...mapActions(['getLists']),
            listSearch(){
                const {words} = this;
                this.searchWord = words.trim();
                if(this.searchWord){
                    this.isSearch=true;
                }
            },

            setPage(){
                let _this = this;
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    
                    //执行一个laypage实例
                    laypage.render({
                        elem: 'page1' //注意，这里的 test1 是 ID，不用加 # 号
                        ,limit: _this.pageLen
                        ,count: _this.searchList.length //数据总数，从服务端得到
                        ,jump: function(obj, first){
                            //首次不执行
                            if(!first){
                                _this.pageIndex = (obj.curr-1)||0;
                            }
                        }
                    });

                });
            }
        },
        created() {
            this.getLists();  //获取列表数据
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* .list-section{padding: 0 100px;} */
    #page1{text-align: center;}
    .content>ul{
        padding: 30px 0 0;
        list-style: none;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }

    .content>ul>li{
        background: f1f1f1;
        border: 1px solid #444;
        margin: 0 20px 40px;
        flex: 0 1 200px;
        width: 200px;height: 260px;
    }
    .content>ul>li img{width: 100%;height: 140px;}
    .content>ul>li p{padding: 10px 10px 0;}

    .search{display: flex;justify-content: flex-end;margin-top: 30px;}
    .search>input{width: 260px;height: 38px;line-height: 38px;padding: 0 10px;}
    .search>span{width: 46px;height: 30px;background: rgb(20, 70, 236);display: block;line-height: 30px;color: #fff;text-align: center;cursor: pointer;}
    .search>a{height: 38px;line-height: 38px;padding: 0 10px;background: #007BFF;color: #fff;margin-right: 600px;}

</style>
