//路由信息页
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
//引入路由配置模块
import routes from './routes.js'
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

// 对外暴露VueRouter类的实例
let router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior (to, from, savedPosition) {
        return {y : 0}
    }
})
export default router