// 导入组件
import input from './src/input.vue'
// 为组件提供install方法，以供按需引入
input.install = (Vue)=>{
  Vue.component(input.name,input)
}

// 导出组件
export default input