// 导入组件
import carouselItem from '../carousel/src/carousel-item.vue'
// 为组件提供install方法，以供按需引入

carouselItem.install = (Vue)=>{
  Vue.component(carouselItem.name,carouselItem)
}


// 导出组件
export default carouselItem
