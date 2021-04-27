<template>
  <div class="badge-box">
    <transition name="bounce">
      <div
        v-if="value"
        :class="['badge-box-1', { dot: dot ,icon: icon,}]"
        :style="{
          backgroundColor: _color,
          border: border ? '2px white solid' : '',
          zIndex: badge_zindex,
        }"
      >
        <template v-if="!this.dot">
          <div v-if="!icon">
            <span v-if="!this.overflow">{{ this.value }}</span>
            <span v-else>{{ this.max }}+</span>
          </div>
          <div v-else>
            <span :class="icon"></span>
          </div>
        </template>
      </div>
    </transition>
    <div ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "s-badge",
  data() {
    return {
      overflow: false,
      badge_zindex: null,
    };
  },
  props: {
    // 显示的值
    value: [String, Number],
    // 小圆点
    dot: Boolean,
    // 图标
    icon: String,
    //最大值
    max: {
      type: Number,
      default: 100,
    },
    //颜色
    color: {
      type: String,
      default: "#e72828",
    },
    // 给标记加上一个白色的边框
    border: Boolean,
  },
  computed: {
    _max: function() {
      return this.max + "+";
    },
    _color: function() {
      return this.$color(this.color).end("rgb");
    },
  },
  watch: {
    value() {
      if (this.value > this.max) {
        this.overflow = true;
      } else {
        this.overflow = false;
      }
    },
  },
  mounted() {
    this.$nextTick(this.setIndex())
  },
  methods: {

    // 将badge的z-index设置的比被它包裹的元素更高
    setIndex() {
      // 获取包裹的元素
      let el = this.$refs.content;
      // 获取元素的z-index
      let z = getComputedStyle(el).getPropertyValue("zIndex");
      this.badge_zindex = Number(z) + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.badge-box {
  position: relative;
  display: inline-flex;
}
.badge-box-1 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  min-width: 8px;
  height: 8px;
  border-radius: 50px;
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 7px;
  color: white;
  font-weight: 900;
}
.dot {
  height: 2px !important;
  width: 2px !important;
  min-width: 0 !important;
}
.icon {
  min-width: none !important;
  height: 8px !important;
  width: 8px !important;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

</style>
