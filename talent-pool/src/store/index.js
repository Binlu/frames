
import Vue from 'vue'
import Vuex from 'vuex';
import data from '../../static/data/data'  
// console.log(Vuex)
Vue.use(Vuex);

export default new Vuex.Store({
	// 1. state
    state:{
        lists: []
    },

    // // 2. getters
    getters:{
        // 参数列表state指的是state数据
        allLists (state){
            let arr = state.lists.reduce(
                function(a, b) {
                    return a.concat(b.ratings);
                },
                []
            );
            return arr;
        }

        
    },
    // 3. actions
    // 通常跟api接口打交道
    actions:{
        getLists({commit,state}){       //假接口请求lists数据
            setTimeout( ()=>{
                const lists = data.lists;
                commit( 'putList', {lists} );     //得到数据后在mutations里写入数据
            }, 200)
        }
    },
    // 4. mutations
    mutations:{
        // name传递过来的数据
        putList(state, {lists}){
            console.log(lists)
            state.lists = lists;//将传参设置给state的city
		},
		
    }
});







