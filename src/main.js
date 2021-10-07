import Vue from 'vue'
import App from './App.vue'
// 导入router路由
import router from './router'
// 导入vuex文件
import store from './store'

import 'amfe-flexible'
// 导入vant组件库
import Vant from 'vant'
import 'vant/lib/index.less'

// 导入全局样式表
// import './index.less'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
