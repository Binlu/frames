import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import list from '@/components/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      	path: '/',
      	name: 'home',
      	component: home
    },
    {
    	path:'/list',
    	component:list
    }
  ]
})
