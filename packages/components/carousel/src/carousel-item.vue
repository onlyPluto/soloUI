<template>
  <div
    :class="[
      {
        move1: direction == 'toLeft',
        move2: direction == 'toRight',
      },
    ]"
    :style="{
      display:
        myself == father_currentIndex || myself == father_targetIndex
          ? 'unset'
          : 'none',
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
//引入事件总线
import { bus } from "../../../utils/bus";
export default {
  name: "s-carousel-item",
  data() {
    return {
      // 该元素index
      myself: null,
      // 移动方向
      direction: null,
      // 目标index
      targetIndex: null,
      //触发者
      tirgger: null,
    };
  },
  inject: ["father"],
  computed: {
    father_currentIndex: function() {
      return this.father.currentIndex;
    },
    father_targetIndex: function() {
      return this.father.targetIndex;
    },
    father_items_length: function() {
      return this.father.length;
    },
  },
  mounted() {
    //获取自身的index
    this.getMyselfIndex();
    // 监听change事件
    bus.$on("change", this.action);
    // 为动画完成设置监听函数
    this.$el.addEventListener("animationend", this.cb);
  },
  methods: {
    getMyselfIndex() {
      let nodelist = this.$parent.$children;
      for (let index in nodelist) {
        if (this == nodelist[index]) {
          this.myself = Number(index);
        }
      }
    },
    //bus的回调函数
    action(...arg) {
      let currentIndex = arg[0];
      let targetIndex = arg[1];
      this.tirgger = arg[2];
      this.targetIndex = arg[1];
      if (this.tirgger == "autoplay" || this.tirgger == "arrow") {
        // 当触发者是autoplay或者arrow时，需要处理边界特殊情况
        this.handleSpecial(currentIndex, targetIndex)
      } else {
        this.handleNormal(currentIndex, targetIndex)
      }
    },
    //动画完成后的回调
    cb() {
      this.direction = null;
      if (this.myself == this.targetIndex) {
        this.father.currentIndex = this.myself;
        this.father.targetIndex = null;
        //去掉move样式
        this.$parent.$children.forEach((item) => {
          item.$el.classList = ["carousel-item-box"];
          item.$el.style.order = 1;
        });
        if (this.father.autoplay) {
          if (this.tirgger == "arrow" || this.tirgger == "indicator") {
            bus.$emit("resetTimer");
          }
        }
      }
      this.tirgger = null;
    },
    //特殊情况下的动画处理
    //利用flex中order的特性，修改元素的排列位置，从而实现无缝轮播 
    handleSpecial(currentIndex, targetIndex) {
      // 右边界特殊情况
      if (currentIndex == this.father_items_length - 1 && targetIndex == 0) {
        // 将第一个元素移动到最后一位
        this.$parent.$children[0].$el.style.order = 2;
        if (this.myself == currentIndex || this.myself == targetIndex) {
          // 移动
          this.direction = "toLeft";
        }
      // 左边界特殊情况
      } else if (currentIndex == 0 && targetIndex == this.father_items_length - 1) {
        // 将最后一个元素移动到第一位
        this.$parent.$children[this.father_items_length - 1].$el.style.order = -1;
        if (this.myself == currentIndex || this.myself == targetIndex) {
          // 移动
          this.direction = "toRight";
        }
      // 正常情况
      } else {
        this.handleNormal(currentIndex, targetIndex)
      }
    },
    //正常情况下的动画处理
    handleNormal(currentIndex, targetIndex) {
      if (this.myself == currentIndex || this.myself == targetIndex) {
        // 移动
        this.direction = currentIndex > targetIndex ? "toRight" : "toLeft";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 向左
.move1 {
  animation: action1 300ms ease forwards;
}
@keyframes action1 {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-100%);
  }
}
// 向右
.move2 {
  animation: action2 300ms ease forwards;
}
@keyframes action2 {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>
