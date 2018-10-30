import Vue from 'vue'
import Router from 'vue-router'


import home from '@/pages/home'
// import list from '@/pages/list'
const list = () => import('@/pages/list')
import detail from '@/pages/detail'
import add from '@/pages/add'


Vue.use(Router)

export default new Router({
    mode:'history',
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
        },
        {
            path:'/add/',
            name:'add',
            meta:{
                links:[{
                    name:'首页',
                    href:'/',
                },
                {
                    name:'列表',
                    href:'/list',
                }],
                title:'新增'
            },
            component:add
        }
    ]
})
