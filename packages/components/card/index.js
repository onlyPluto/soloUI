// 导入组件
import card from './src/card.vue'
// 为组件提供install方法，以供按需引入
card.install = (Vue)=>{
  Vue.component(card.name,card)
}

// 导出组件
export default card