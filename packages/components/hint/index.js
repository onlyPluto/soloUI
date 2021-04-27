// 导入组件
import hint from './src/hint.vue'
// 为组件提供install方法，以供按需引入
hint.install = (Vue)=>{
  Vue.component(hint.name,hint)
}

// 导出组件
export default hint