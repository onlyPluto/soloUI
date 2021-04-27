// 导入组件
import badge from './src/badge.vue'
// 为组件提供install方法，以供按需引入
badge.install = (Vue)=>{
  Vue.component(badge.name,badge)
}

// 导出组件
export default badge