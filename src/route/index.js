import Vue from 'vue'
import VueRouter from "vue-router";//引入组件
Vue.use(VueRouter)

import EconicsTrend from '@/views/ecomicsTrend/index.vue'
import WaterAnalysis from '@/views/WaterAnalysis/index.vue'
import UserProvide from '@/views/WaterAnalysis/UserProvideWater'
import HisUseWater from '@/views/HisUseWater'
import WaterNeed from '@/views/WaterNeed'
import LifeNeedWater from '@/views/WaterNeed/LifeNeedWater'
import EcologicalNeedWater from '@/views/WaterNeed/EcologicalNeedWater'
import ForestNeedWater from '@/views/WaterNeed/ForestNeedWater'
import IrrigationNeedWater from '@/views/WaterNeed/IrrigationNeedWater'
import ProductNeedWater from '@/views/WaterNeed/ProductNeedWater'
import RationalityAnalysis from '@/views/WaterNeed/RationalityAnalysis'
import WaterNeedAll from '@/views/WaterNeed/WaterNeedAll'

// 让编程式路由导航不在下面报错
let originPush = VueRouter.prototype.push
// 重写push|replace 方法
// 第一个参数：告诉原来的push方法，往哪里跳转
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call | apply
        // 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递函数：call传递函数参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
// 重写replace方法
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: EconicsTrend
    },
    {
        path: '/wateranalysis',
        component: WaterAnalysis,
        children: [{
            name: 'useprovide',
            path: '/wateranalysis/useprovide',
            component: UserProvide,
        },
            // {
            //     path: '/wateranalysis',
            //     redirect: '/wateranalysis/useprovide'
            // }
        ]
    },
    {
        name: 'historywater',
        path: '/hisusewater',
        component: HisUseWater
    },

    {
        path: '/waterneed',
        component: WaterNeed,
        children: [
            // 生活需水
            {
                name: 'lifeneed',
                path: '/waterneed/lifeneedwater',
                component: LifeNeedWater
            },
            // 生产需水
            {
                name: 'shengchan',
                path: '/waterneed/productneedwater',
                component: ProductNeedWater
            },
            // 灌溉需水
            {
                name: 'guangai',
                path: '/waterneed/irrigationneedwater',
                component: IrrigationNeedWater
            },
            // 林牧渔需水
            {
                name: 'linmuyu',
                path: '/waterneed/forestneedwater',
                component: ForestNeedWater
            },
            // 生态需水
            {
                name: 'shengtai',
                path: '/waterneed/ecologicalneedwater',
                component: EcologicalNeedWater
            },
            // 需水计算汇合
            {
                name: 'huihe',
                path: '/waterneed/waterneedall',
                component: WaterNeedAll
            },
            // 生活需水
            {
                name: 'helixingfenxi',
                path: '/waterneed/rationalityanalysis',
                component: RationalityAnalysis
            },
        ]
    },
]

export default new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})
