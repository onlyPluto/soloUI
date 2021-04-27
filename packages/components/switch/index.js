// 导入组件
import Switch from './src/switch.vue'
// 为组件提供install方法，以供按需引入
Switch.install = (Vue)=>{
  Vue.component(Switch.name,Switch)
}

// 导出组件
export default Switch
