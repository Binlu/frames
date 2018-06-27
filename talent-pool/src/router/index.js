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
                links:[{
                    name:'首页',
                    href:'/',
                }],
                title:'列表'
            },
        	component:list
        },
        {
            path:'/detail/:id',
            name:'detail',
            meta:{
                links:[{
                    name:'首页',
                    href:'/',
                },
                {
                    name:'列表',
                    href:'/list',
                }],
                title:'详情'
            },
            component:detail
        }
    ]
})
