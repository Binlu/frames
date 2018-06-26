<template>
    <div id="app">
        <header-template></header-template>
        <router-view></router-view>
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
}
</script>

<style>
    @import "../static/css/common/main.css";
</style>