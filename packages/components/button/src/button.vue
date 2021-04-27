<template>
  <div>
    <button
      :type='type'
      @click="handler"
      :class="[
        size,
        'elevation-' + elevation,
        {
          circle1: circle && size == 'medium',
          circle2: circle && size == 'large',
          circle3: circle && size == 'mini',
        },
        { 'is-disabled': disabled },
      ]"
      :disabled="disabled"
      :style="{
        borderRadius: round ? '50px' : '4px',
        backgroundColor: _color,
      }"
    >
      <div
        :style="{
          'font-weight': '500',
          color: _fontColor,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }"
      >
        <i
          v-if="icon && icon_left"
          :class="[
            icon,
            { i1: size == 'medium', i2: size == 'large', i3: size == 'mini' },
          ]"
          :style="{ color: _fontColor }"
        ></i>
        <div v-if="!circle" style="margin-left:5px;margin-right:5px">
          <slot></slot>
        </div>
        <i
          v-if="icon && icon_right"
          :class="[
            icon,
            { i1: size == 'medium', i2: size == 'large', i3: size == 'mini' },
          ]"
          :style="{ color: _fontColor }"
        ></i>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: "s-button",
  computed: {
    _color: function() {
      return this.$color(this.color).end('rgb');
    },
    _fontColor: function() {
      return this.$color(this.fontColor).end('rgb');
    },
    icon_left: function() {
      if (this.location == "left") {
        return true;
      } else {
        return false;
      }
    },
    icon_right: function() {
      if (this.location == "right") {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    if (!this.icon && this.circle) {
      throw Error("当使用圆形按钮时，必须使用icon");
    }
  },
  props: {
    //按钮类型
    type: {
      type: String,
      default: "button",
    },
    // 按钮颜色
    color: {
      type: String,
      default: "#fff",
    },
    //按钮文字颜色
    fontColor: {
      type: String,
      default: "#000",
    },
    //按钮大小
    size: {
      type: String,
      default: "medium",
    },
    // 按钮海拔
    elevation: {
      type: Number,
      default: 1,
    },
    //按钮图标
    icon: String,
    //图标的位置
    location: {
      type: String,
      default: "left",
    },
    // 是否圆角按钮
    round: Boolean,
    //圆形按钮
    circle: {
      type: Boolean,
      default: false,
    },
    //是否可用
    disabled: {
      type: Boolean,
      default: false,
    },
    //路由跳转
    to:String,
  },
  methods: {
    handler() {
      if(this.to){
        this.$router.push(this.to)
      }else{
        this.$emit("click");
      }
      
    },
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
  &:hover {
    filter: brightness(85%);
  }
}
.is-disabled {
  filter: brightness(80%) !important;
  cursor: not-allowed !important;
}
@mixin shape-a($height, $size, $padding) {
  height: $height;
  font-size: $size;
  padding-left: $padding;
  padding-right: $padding;
}
.large {
  @include shape-a(48px, 22px, 23px);
}
.medium {
  @include shape-a(40px, 17px, 18px);
}
.mini {
  @include shape-a(32px, 15px, 10px);
}
@mixin shape-b($height) {
  height: $height !important;
  width: $height !important;
  border-radius: 50% !important;
}
.circle1 {
  @include shape-b(40px);
}
.circle2 {
  @include shape-b(50px);
}
.circle3 {
  @include shape-b(30px);
}
.i1 {
  font-size: 20px;
}
.i2 {
  font-size: 24px;
}
.i3 {
  font-size: 18px;
}
</style>
