// 导入组件
import button from './src/button.vue'
// 为组件提供install方法，以供按需引入
button.install = (Vue)=>{
  Vue.component(button.name,button)
}

// 导出组件
export default button