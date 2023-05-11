import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
//引入饿了么Ui
import element from '@/plugins/element'
import 'element-ui/lib/theme-chalk/index.css';
// //引入mockServejs--mock数据
// import '@/mock/mockServe'
// import {login} from '@/api/mock'
// let data = {}
// data.username='test'
// data.password='123456'
// let result = login(JSON.stringify(data))
// result.then((r)=>{
//   console.log(r);
// })
Vue.config.productionTip = false
//引入element组件库
Vue.use(element)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
