<template>
    <div class="list-section">
        <div class="search">
            <input @keydown.13="listSearch" v-model="words" type="text" class="form-control" id="exampleInputPassword1" placeholder="请按照学校，专业 搜索人才">
            <button @click="listSearch" class="btn btn-primary" type="button">搜索</button>
        </div>
    	<div class="content" v-if="allLists.length">
            <ul >
                <li v-for="(item, n) in searchList" :key="n">
                    <router-link :to="'/detail/'+item.id">
                        <img :src="item.pic" alt="">
                        <p>
                            <span>学校： </span> {{item.scholl}}<br/>
                            <span>年龄： </span> {{item.age+'岁'}}<br/>
                            <span>专业： </span> {{item.major}}
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div style="text-align:center" v-show="nullShow">
            抱歉，您搜索的人才暂时没有!!!
        </div>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'home',
        data () {
            return{
                words: '',
                searchWord: '',
                isSearch: false
            }
        },
        computed: {
            // ...mapState(['lists']),
            ...mapGetters(['allLists']),
            searchList(){
                const {searchWord} = this;
                const arr = this.allLists.filter(obj => {
                    if( searchWord ){
                        return (obj.major.indexOf(searchWord) !==-1 || obj.scholl.indexOf(searchWord) !==-1 )
                    }else{
                        return true;
                    }
                })
                return arr;
            },
            nullShow(){
                const {isSearch, searchList} = this;
                return (isSearch==true && searchList.length<=0)
            }
        },
        // watch: {
        //     searchList(newVal){
        //         this.nullShow = newVal.length<=0;
        //     }
        // },
        methods: {
            ...mapActions(['getLists']),
            listSearch(){
                const {words} = this;
                this.searchWord = words.trim();
                this.searchWord && (this.isSearch=true)
            }
        },
        created() {
            this.getLists();  //获取列表数据
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .list-section{padding: 0 100px;}
    .content>ul{
        padding: 100px 0;
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

    .search{display: flex;justify-content: flex-end;}
    .search>input{width: 260px;height: 38px;line-height: 38px;padding: 0 10px;}
    .search>span{width: 46px;height: 30px;background: rgb(20, 70, 236);display: block;line-height: 30px;color: #fff;text-align: center;cursor: pointer;}

</style>
