// 导入组件
import badge from './components/badge/index'
import button from './components/button/index'
import card from './components/card/index'
import carousel from './components/carousel/index'
import carouselItem from './components/carousel-item/index'
import hint from './components/hint/index'
import input from './components/input/index'
import mask from './components/mask/index'
import Switch from './components/switch/index'


// 导入公共样式
import './style/index.scss'

//导入工具函数
import {color} from './utils/color/color'

// 组件列表
const components = [
  badge,
  button,
  card,
  carousel,
  carouselItem,
  hint,
  input,
  mask,
  Switch,
]

// 定义install方法，接受vue为参数，如果使用use注册组件，则所有组件都将被注册
const install = function(Vue){
  // 判断是否安装
  if(install.installed){
    return
  }
  //遍历注册所有组件
  components.forEach(item=>{
    Vue.component(item.name,item)
  })
  //注册工具函数
  Vue.prototype.$color = color
}

//判断是否是直接引入文件
if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}

export default{
  //必须导出install方法，才能被Vue.use()方法安装
  install,
  // 组件列表
  ...components
}
