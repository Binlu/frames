<template>
    <div id="app">
        <header-template></header-template>
        <div class="content container">
            <div class="row">
                <div class="col-md-12 position-title">
                    <position-ele :position="position"></position-ele>
                </div>
            </div>
            <router-view></router-view>
        </div>
        <footer-template></footer-template>
    </div>
</template>

<script>
import header from '@/components/header';
import footer from '@/components/footer';
export default {
    name: 'App',
    components: { 
       'header-template':header,
        'footer-template':footer,
        'position-ele':{
            props:['position'],
            template:'<h3>当前位置：<a v-for="item in position.links" :href="item.href">{{item.name}}></a><span>{{position.now_name}}</span></h3>'
        }
    },

    data(){
        return {
            position:{
                links:[],
                now_name:''
            },
        }
    },
    mounted:function(){
        this.getStatus()
    },
    methods:{
        getStatus:function(){
            this.position.links=this.$route.meta.links;
            this.position.now_name=this.$route.meta.title;
        }
    },
    updated:function(){
        this.getStatus();
    }
}
</script>

<style>
    @import "../static/css/common/main.css";
</style>