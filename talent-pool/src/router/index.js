import Vue from 'vue'
import Router from 'vue-router'


import home from '@/pages/home'
// import list from '@/pages/list'
const list = () => import('@/pages/list')
import detail from '@/pages/detail'


Vue.use(Router)

export default new Router({
    routes: [
        {
          	path: '/',
          	name: 'home',
            meta:{
                title:'首页'
            },
          	component: home
        },
        {
        	path:'/list',
            name:'list',
            meta:{
                title:'列表'
            },
        	component:list
        },
        {
            path:'/detail',
            name:'detail',
            meta:{
                title:'详情'
            },
            component:detail
        }
    ]
})
