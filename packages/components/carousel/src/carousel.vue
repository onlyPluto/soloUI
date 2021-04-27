<template>
  <div
    class="carousel-box"
  >
    <!-- 轮播窗口 -->
    <div
      class="item-box"
      @mouseenter="auto_enter"
      @mouseleave="auto_leave"
      :style="{
        width: c_width,
        height: c_height,
      }"
    >
      <slot></slot>
    </div>
    <!-- 指示器 -->
    <div class="indicator-box">
      <div
        @click="itemClick(index)"
        :class="{ 'i-item-1': true }"
        v-for="(item, index) in length"
        :key="index"
        :style="{
          backgroundColor: index == currentIndex ? _color : 'white',
        }"
      ></div>
    </div>
    <!-- 左箭头 -->
    <div class="left-arrows" @click="leftArrow">
      <div>
        <i class="mdi mdi-chevron-left arrows"></i>
      </div>
    </div>
    <!-- 右箭头 -->
    <div class="right-arrows" @click="rightArrow">
      <div>
        <i class="mdi mdi-chevron-right arrows"></i>
      </div>
    </div>
  </div>
</template>

<script>
//引入事件总线
import { bus } from "../../../utils/bus";
export default {
  name: "s-carousel",
  data() {
    return {
      // 需要遍历的数组的长度
      length: 0,
      // 当前index
      currentIndex: 0,
      // 目标index·
      targetIndex: null,
      // 计时器
      timer: null,
      // 组件宽高
      c_height: null,
      c_width: null,
    };
  },
  props: {
    //指示器颜色
    activeColor: {
      type: String,
      default: "#FBC02D",
    },
    //自动播放
    autoplay: {
      type: Boolean,
      default: false,
    },
    //轮播间隔时间
    interval: {
      type: [Number, String],
      default: 3000,
      validator: function(v) {
        if (v > 0) {
          return v;
        } else {
          throw Error("interval必须大于0");
        }
      },
    },
  },
  computed: {
    // 指示器颜色
    _color: function() {
      return this.$color(this.activeColor).end("rgb");
    },
  },
  provide() {
    return {
      father: this,
    };
  },
  mounted() {
    // 初始化
    this.init();
    if (this.autoplay) {
      this.auto();
    }
    bus.$on("resetTimer", this.resetTimer);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    // 初始化轮播图组件，给this.length赋值
    init() {
      let el = this.$children[0].$el;
      this.c_width = getComputedStyle(el).getPropertyValue("width");
      this.c_height = getComputedStyle(el).getPropertyValue("height");
      this.length = this.$children.filter((v) => {
        return v.$options.name == "s-carousel-item";
      }).length;
    },
    //指示器点击
    itemClick(index) {
      
      if (this.currentIndex == index) {
        return false;
      }
      this.targetIndex = index;
      if (!this.autoplay) {
        //发布一个事件
        bus.$emit("change", this.currentIndex, this.targetIndex, "indicator");
      } else {
        // 清除定时器
        clearInterval(this.timer);
        this.timer = null;
        //发布一个事件
        bus.$emit("change", this.currentIndex, this.targetIndex, "indicator");
      }
    },

    //左箭头点击
    leftArrow() {
      // 如果存在计时器，将其清除
      clearInterval(this.timer);
      this.timer = null;
      if (this.currentIndex == 0) {
        this.targetIndex = this.length - 1;
        bus.$emit("change", 0, this.targetIndex, "arrow");
      } else {
        this.targetIndex = this.currentIndex - 1;
        bus.$emit("change", this.currentIndex, this.targetIndex, "arrow");
      }
    },
    //右箭头点击
    rightArrow() {
      // 如果存在计时器，将其清除
      clearInterval(this.timer);
      this.timer = null;
      if (this.currentIndex == this.length - 1) {
        this.targetIndex = 0;
        bus.$emit("change", this.currentIndex, this.targetIndex, "arrow");
      } else {
        this.targetIndex = this.currentIndex + 1;
        bus.$emit("change", this.currentIndex, this.targetIndex, "arrow");
      }
    },
    //自动播放
    auto() {
      
      this.timer = setInterval(() => {
        if (this.currentIndex == this.length - 1) {
          this.targetIndex = 0;
          bus.$emit("change", this.currentIndex, this.targetIndex, "autoplay");
        } else {
          this.targetIndex = this.currentIndex + 1;
          bus.$emit("change", this.currentIndex, this.targetIndex, "autoplay");
        }
      }, this.interval);
    },
    //自动播放状态下，鼠标移入
    auto_enter() {
      if (!this.autoplay) {
        return false;
      }
      clearInterval(this.timer);
      this.timer = null;
    },
    //自动播放状态下，鼠标移出
    auto_leave() {
      if (!this.autoplay) {
        return false;
      }
      // 清除定时器
      clearInterval(this.timer);
      this.timer = null;
      this.auto();
    },
    //重置定时器
    resetTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.auto();
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-box {
  background-color: transparent;
  position: relative;
  overflow: hidden;
}
.indicator-box {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  background-color: #0a0a0a63;
}
.i-item-1 {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: #fff;
  margin: 0px 5px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
}
.item-box {
  display: flex;
}
@mixin flex() {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 15%;
  background-color: transparent;
}
@mixin circle() {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  background-color: #0a0a0a63;
  border-radius: 50%;
  cursor: pointer;
}
.left-arrows {
  @include flex();
  left: 0;
  div {
    @include circle();
  }
}
.right-arrows {
  @include flex();
  right: 0;
  div {
    @include circle();
  }
}
.arrows {
  color: white;
  font-size: 40px;
}
</style>
