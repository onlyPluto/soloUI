// 导入组件
import mask from './src/mask.vue'
// 为组件提供install方法，以供按需引入
mask.install = (Vue)=>{
  Vue.component(mask.name,mask)
}

// 导出组件
export default mask