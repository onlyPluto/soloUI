// 导入组件
import carousel from './src/carousel.vue'

// 为组件提供install方法，以供按需引入
carousel.install = (Vue)=>{
  Vue.component(carousel.name,carousel)
}



// 导出组件
export default carousel
