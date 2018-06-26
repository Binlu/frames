<template>
    <div id="app">
        <header-template></header-template>
        <div class="content container">
            <div class="row">
                <div class="col-md-12">
                    <h3>当前位置：{{position}}</h3>
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
    },

    data(){
        return {
            position:'',
        }
    },
    mounted:function(){
        this.position=this.$route.meta.title;
    }
}
</script>

<style>
    @import "../static/css/common/main.css";
</style>