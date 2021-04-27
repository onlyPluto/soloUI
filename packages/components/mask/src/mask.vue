<template>
  <div
    v-if="show"
    class="mask-content"
    :style="{
      zIndex: mask_index,
      backgroundColor: _color,
      position: limited ? 'absolute' : 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: limited ? 'inherit' : m_height + 'px',
      width: limited ? 'inherit' : m_width + 'px',
      borderRadius:limited?'inherit':'0px'
    }"
  >
    <div class="mask-content" :style="{ 'z-index': mask_index + 1 }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { getZindex } from "../../../utils/common";
export default {
  name: "s-mask",
  data() {
    return {
      mask_index: null,
      h_overflow_status: "",
      b_overflow_status: "",
      m_height: "",
      m_width: "",
    };
  },
  computed: {
    _color: function() {
      return this.$color(this.color)
        .opacity(Number(this.alpha))
        .end("rgba");
    },
  },
  props: {
    //控制遮罩层的开关
    show: {
      type: Boolean,
      default: false,
    },
    //遮罩层的透明度
    alpha: {
      type: [Number, String],
      default: 0.6,
    },
    //遮罩层颜色
    color: {
      type: String,
      default: "#000000",
    },
    // 为true时，遮罩层将被限制在父元素的范围内
    limited: Boolean,
  },
  watch: {
    show: function() {
      if (this.show) {
        let html = document.getElementsByTagName("html")[0];
        let body = document.getElementsByTagName("body")[0];
        // 保存html和body的overflow的初始值
        this.h_overflow_status = getComputedStyle(html).getPropertyValue(
          "overflow"
        );
        this.b_overflow_status = getComputedStyle(body).getPropertyValue(
          "overflow"
        );
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
      } else {
        // 遮罩层注销，恢复html和body的初始值
        let html = document.getElementsByTagName("html")[0];
        let body = document.getElementsByTagName("body")[0];
        html.style.overflow = this.h_overflow_status;
        body.style.overflow = this.b_overflow_status;
      }
    },
  },
  mounted() {
    
    //获取当前页面所有元素中'z-index'最高的值
    let index = getZindex();
    //设置遮罩层的'z-index'比最高值+1
    this.mask_index = Number(index) + 1;
    if (this.limited) {
      this.maskLimit();
    }else{
      this.getSize()
    }
  },
  methods: {
    maskLimit() {
      //获取父元素
      let parent = this.$el.parentElement;
      // 获取父元素position值
      let p = getComputedStyle(parent).getPropertyValue("position");
      if (p == "static") {
        console.log("zhixing");
        parent.style.position = "relative";
      }
    },
    getSize() {
      this.m_height = document.body.clientHeight
      this.m_width = document.body.clientWidth
    },
  },
};
</script>

<style lang="scss" scoped>
.mask-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
