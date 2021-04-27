<template>
  <div class="content">
    <label
      v-if="label && location == 'front'"
      :for="id"
      :style="{
        color: checked ? _color : '#b3b3b3',
        'font-weight': 800,
        'margin-right': `${space}px`,
      }"
      >{{ label }}
    </label>
    <div class="switch-box">
      <input
        type="checkbox"
        :id="id"
        :value="value"
        :style="{
          backgroundColor: checked
            ? this.$color(color)
                .darken(60)
                .end('rgb')
            : '#b3b3b3',
        }"
        @change="handleChange"
        :class="[mode]"
        :disabled="disabled"
      />
      <div
        :class="[
          {
            'shell-float':mode =='float',
            'shell-implant':mode =='implant',
            'to-open-float': toOpen && mode == 'float',
            'to-open-implant': toOpen && mode=='implant',
            'to-close': toClose,
          },
        ]"
      >
        <div
          ref="div"
          @click="disabled ? '' : handleChange()"
          @mouseenter="disabled ? '' : (active_bg = true)"
          @mouseleave="disabled ? '' : (active_bg = false)"
          :class="[
            { 'elevation-1': mode == 'float' },
            {
              'is-active-float': checked && mode=='float',
              'is-unactivated-float': !checked && mode == 'float',
              'is-active-implant':checked && mode == 'implant',
              'is-unactivated-implant':!checked && mode == 'implant',
            },
          ]"
          :style="{
            backgroundColor: checked ? _color : 'white',
          }"
        ></div>
        <div class="active-bg" v-if="mode == 'float' && active_bg"></div>
      </div>
    </div>
    <label
      v-if="label && location == 'behind'"
      :for="id"
      :style="{
        color: checked ? _color : '#b3b3b3',
        'font-weight': 800,
        'margin-left': `${space}px`,
      }"
      >{{ label }}</label
    >
  </div>
</template>

<script>
export default {
  name: "s-switch",
  data() {
    return {
      active_bg: false,
      toOpen: false,
      toClose: false,
    };
  },
  props: {
    //风格
    mode: {
      type: String,
      default: "float", //implant
    },
    //input组件的id
    id: {
      type: String,
      default: "switch",
    },
    //组件颜色
    color: {
      type:String,
      default:'f-info'
    },
    //checkbox的值
    value: {
      type: [Boolean, String, Number, Array],
      required: true,
    },
    //打开时的值
    activeValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    //关闭时的值
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    //禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    //标签
    label: String,
    //标签位置
    location: {
      type: String,
      default: "front",
    },
    //标签与控件的间距
    space: {
      type: [String, Number],
      default: 0,
    },
  },
  computed: {
    checked: function() {
      return this.value == this.activeValue;
    },
    _color: function() {
      return this.$color(this.color).end("rgb");
    },
  },
  mounted() {
    if (this.checked) {
      this.toOpen = true;
    }
  },
  methods: {
    handleChange() {
      if (!this.checked) {
        // 打开
        this.toOpen = true;
        this.toClose = false;
      } else {
        //关闭
        this.toOpen = false;
        this.toClose = true;
        this.active_bg = false;
      }
      const v = this.checked ? this.inactiveValue : this.activeValue;
      this.$emit("input", v);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.switch-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  width: 65px;
}
.float {
  position: absolute;
  top: 7.5px;
  z-index: 1;
  -webkit-appearance: none;
  height: 18px;
  width: 40px;
  border-radius: 50px;
}
.implant {
  position: absolute;
  z-index: 1;
  -webkit-appearance: none;
  height: 24px;
  width: 45px;
  border-radius: 50px;
}
.shell-float {
  // height: 38px;
  // width: 38px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  left: 8px;
}
.shell-implant {
  height: 38px;
  width: 38px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 2;
  left: 4px;
}
.is-active-float {
  border-radius: 50%;
  height: 21px;
  width: 21px;
}
.is-active-implant {
  border-radius: 50%;
  height: 18px;
  width: 18px;
}
.is-unactivated-float {
  border-radius: 50%;
  height: 21px;
  width: 21px;
}
.is-unactivated-implant {
  border-radius: 50%;
  height: 18px;
  width: 18px;
}
.active-bg {
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  height: 35px;
  width: 35px;
  background-color: rgba(179, 179, 179, 0.4);
}
.to-open-float {
  animation: action1 300ms ease-out forwards;
}
.to-open-implant{
  animation: action2 300ms ease-out forwards;
}
@keyframes action1 {
  from {
    transform: translate(0px);
  }
  to {
    transform: translate(29px);
  }
}
@keyframes action2 {
  from {
    transform: translate(0px);
  }
  to {
    transform: translate(20px);
  }
}
.to-close {
  animation: action3 400ms ease-out forwards;
}
@keyframes action3 {
  from {
    transform: translate(23px);
  }
  to {
    transform: translate(0px);
  }
}

</style>
