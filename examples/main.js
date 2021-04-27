import Vue from 'vue'
import App from './App.vue'

//引入组件库公共样式文件
import '../packages/style/index.scss'
// 引入组件库
import soloui from '../packages/index'
Vue.use(soloui)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
