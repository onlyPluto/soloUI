<template>
  <div
    v-if="hint_show"
    class="hint-box"
    :class="[
      'bg-' + type,
      'location-' + location,
      { in: hint_show, out: !hint_show },
    ]"
    :style="{
      borderRadius: round ? '50px' : '4px',
      backgroundColor: `${_tint} !important`,
    }"
  >
    <div :class="['hint-box-1', { 'text-center': center }]">
      <span :style="{ color: _fontColor }">{{ text }}</span>
    </div>
    <div class="hint-box-2" v-if="close" @click="hint_show = false">
      <button style="width:100%">
        <span :style="{ color: _fontColor }">关闭</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "s-hint",
  data() {
    return {
      hint_show: this.show,
    };
  },
  computed: {
    _tint: function() {
      return this.$color(this.tint).end('rgb')
    },
    _fontColor: function() {
      return this.$color(this.fontColor).end('rgb')
    },
  },
  watch: {
    show: function() {
      if (this.show) {
        this.hint_show = true;
        setTimeout(() => {
          this.hint_show = false;
        }, this.timeout);
      }
    },
  },
  props: {
    //显示
    show: Boolean,
    //提示条出现的位置
    location: {
      type: String,
      default: "top",
    },
    //提示内容
    text: {
      type: String,
      required: true,
    },
    //过期时间
    timeout: {
      type: Number,
      default: 2000,
    },
    //类型
    type: {
      type: String,
      default: "info",
    },
    //字体颜色
    fontColor: {
      type: String,
      default: "black",
    },
    //背景颜色
    tint: {
      type: String,
      default: "",
    },
    //关闭按钮
    close: Boolean,
    // 圆角
    round: Boolean,
    //内容居中对齐
    center: Boolean,
  },
};
</script>

<style lang="scss" scoped>
button {
  border: none;
  outline: none;
  background-color: transparent;
  /* 小手 */
  cursor: pointer;
}
.hint-box {
  position: absolute;
  left: auto;
  right: auto;
  height: 50px;
  overflow: hidden;
  width: 360px;
  padding: 5px 15px;
  box-shadow: 0px 4px 14px 2px rgb(163, 162, 162);
  display: flex;
  justify-content: center;
  align-items: center;
}

.hint-box-1 {
  width: 100%;
  span {
    font-size: 16px;
  }
}
.hint-box-2 {
  width: 18%;
  span {
    font-size: 16px;
    font-weight: 600;
  }
}
.text-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.location-top {
  // top: -100px;
  top: 20px;
}
.location-bottom {
  bottom: -100px;
}
.in {
  animation: bounce-in 0.3s;
}
.out {
  animation: fade-out 0.2s;
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
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
