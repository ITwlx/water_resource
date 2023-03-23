import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

import {
    city_water_use_plot,
    city_water_supply_table,
    area_water_use_plot,
    area_water_supply_table,
} from "@/api/waterAnalysis/index";

const actions = {
    // 获取dispatch函数，处理数据
    async waterdata({ commit },data) {
        
        if(result1.status==200 && result2.status==200){
            commit('WATERDATA',{r1:result1.data.data,r2:result2.data.data})
        }
    }
}
// 给数据赋值
const mutations = {
    WATERDATA(state,r){
        state.water_data.supply_water_data = r.r1
        state.water_data.use_water_data = r.r2
    }
}
const state = {
    
}
const getters = {

}
export default new Vuex.Store({
        actions,
        mutations,
        state,
        getters
})