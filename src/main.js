import Vue from 'vue'
import App from './App.vue'
import element from '@/plugins/elementUi'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from '@/route'
import store from '@/store'

Vue.use(element)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
