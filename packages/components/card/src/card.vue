<template>
  <div
    :class="['elevation-'+cardStyle]"
    :style="[init,custom]"
  >
  <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-card",
  data(){
    return{
      cardStyle:this.elevation,
      init:{
        height: `${this.height}px`,
        width: `${this.width}px`,
        backgroundColor: this._color,
        borderRadius: `${this.radius}px`,
      },

    }
  },
  props: {
    //背景颜色
    color: {
      type: String,
      default: "#ffffff",
    },
    //宽度
    width: {
      type: [Number,String],
      default: 200,
      validator:function(v){
        if(/px/.test(v)){
          return v.slice(-2)
        }else{
          return v
        }
      }
    },
    //高度
    height: {
      type: [Number,String],
      default: 280,
      validator:function(v){
        if(/px/.test(v)){
          return v.slice(-2)
        }else{
          return v
        }
      }
    },
    //边框半径
    radius:{
      type: [Number,String],
      default:4,
      validator:function(v){
        if(/px/.test(v)){
          return v.slice(-2)
        }else{
          return v
        }
      }
    },
    //海拔
    elevation: {
      type: Number,
      default: 3,
    },
    //阴影显示时机
    hover:Boolean,
    //样式
    custom:{
      type:Object,
      default(){
        return{}
      },
    }
  },
  computed:{
    _color:function(){
      return this.$color(this.color).end('rgb');
    },

  },
  mounted() {
    if (this.hover) {
      this.cardStyle = 0
      this.$el.addEventListener("mouseenter",this.handler1);
      this.$el.addEventListener("mouseleave",this.handler2);
    }
  },
  beforeDestroy(){
    this.$el.removeEventListener("mouseenter",this.handler1);
    this.$el.removeEventListener("mouseleave",this.handler2);
  },
  methods:{
    handler1(){
      this.cardStyle = this.elevation
    },
    handler2(){
      this.cardStyle = 0
    }
  },
};
</script>

