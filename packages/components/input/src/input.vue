<template>
  <div class="yi-input">
    <!-- 输入框 -->
    <input
      :value="value"
      :type="type"
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @change="onChange"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
      :disabled="disabled"
      :autofocus="autofocus"
      :maxlength="maxlength"
      :minlength="minlength"
      :style="{
        boxSizing: 'border-box',
        height: '24px',
        fontSize: '8px',
        borderRadius: mode === 'outline' ? '3px' : '',
        paddingRight: clearable ? '20px' : '5px',
        borderColor: active ? _color : '',
        width: width,
      }"
      :class="[
        `input-${mode}`,
        {
          'active-outline': mode === 'outline' && active,
          'active-underline': mode === 'underline' && active,
          'active-filled': mode === 'filled' && active,
        },
      ]"
    />
    <!-- 清除图标 -->
    <i
      v-if="clearable && value"
      @click="onClear"
      id="clear"
      class="mdi mdi-close"
      style="color:grey"
    ></i>
    <!-- 提示文本 -->
    <span
      v-if="hint"
      :class="['hint', { 'hint-active': hidden != 'auto' || active }]"
      >{{ hint }}</span
    >
    <!-- 计数器 -->
    <span
      v-if="counter"
      :class="['counter', { 'counter-active': hidden != 'auto' || active }]"
      :style="{color:error?'red':'grey'}"
      >
      {{ chars }}/{{ counter }}
    </span>
  </div>
</template>

<script>
export default {
  name: "s-input",
  data() {
    return {
      active: false,
      isComposing: false,
      chars: 0,
      error:false
    };
  },
  props: {
    // 原生type
    type: {
      type: String,
      default: "text",
    },
    mode: {
      type: String,
      default: "outline",
    },
    //原生name
    name: String,
    //原生form
    form: String,
    //原生maxlength，最大输入长度
    maxlength: Number,
    //原生minlength,最小输入长度
    minlength: Number,
    // 输入框颜色
    color: {
      type: String,
      default: "f-info",
    },
    //原生autofocus，自动获取焦点
    autofocus: {
      type: Boolean,
      default: false,
    },
    //占位符
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    //输入框宽度
    width: {
      type: String,
      default: "100%",
    },
    //绑定的值
    value: String,
    //原生disabled属性
    disabled: {
      type: Boolean,
      default: false,
    },
    //可清除
    clearable: {
      type: Boolean,
      default: false,
    },
    // 隐藏提示信息
    hidden: {
      type: String,
      default: "auto",
    },
    //输入提示
    hint: String,
    // 计数器
    counter: [Number, String],
  },
  computed: {
    _color: function() {
      return this.$color(this.color).end("rgb");
    },
    activeMode: function() {
      return `active-outline`;
    },
  },
  watch:{
    chars:function(){
      if(Number(this.chars) > Number(this._counter)){
        this.error = true
      }else{
        this.error = false
      }
    }
  },
  methods: {
    //输入框获取焦点
    onFocus() {
      this.active = true;
    },
    // 输入框失去焦点
    onBlur() {
      this.active = false;
    },
    //input事件
    onInput(event) {
      // 如果是中文输入，直接返回
      if (this.isComposing) {
        return false;
      }
      this.chars = event.target.value.length;
      this.$emit("input", event.target.value);
    },
    // change事件
    onChange(event) {
      this.$emit('change', event.target.value);
    },
    //点击清除图标
    onClear() {
      this.$emit("change", "");
      this.$emit("input", "");
      this.chars = 0
    },
    onCompositionStart() {
      this.isComposing = true;
    },
    onCompositionEnd(event) {
      this.onInput(event);
      this.isComposing = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.yi-input {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  input {
    -webkit-appearance: none;
  }
  input:focus-visible {
    outline: none;
  }
}
//outline模式下的样式
.input-outline {
  background-color: transparent;
  border: 0.5px gray solid;
  padding: 0px 5px !important;
  &:hover {
    border-width: 1px;
  }
}
//input获取焦点时
.active-outline {
  border: 1px black solid;
}
//filled模式下的样式
.input-filled {
  background-color: #e8e4e4;
  border: none;
  border-radius: 50px !important;
  padding: 0px 10px;
  &:hover {
    background-color: #d6d4d4;
  }
}
//underline模式下的样式
.input-underline {
  background-color: transparent;
  border: none;
  padding: 0px 5px;
  border-bottom: 0.5px gray solid;
  &:hover {
    border-bottom-width: 1px;
  }
}
.active-underline {
  border-bottom: 1px black solid;
}
//清除按钮
#clear {
  position: absolute;
  right: 5px;
  font-size: 11px;
  z-index: 0;
  display: inline-block;
}
//提示文本
.hint {
  position: absolute;
  top: 26px;
  left: 5px;
  color: grey;
  font-size: 6px;
  opacity: 0;
}
.hint-active {
  animation: action1 300ms forwards;
}
@keyframes action1 {
  from {
    opacity: 0;
    top: 22px;
  }
  to {
    opacity: 1;
    top: 26px;
  }
}
//提示文本
.counter {
  position: absolute;
  top: 26px;
  right: 5px;
  color: grey;
  font-size: 6px;
  opacity: 0;
}
.counter-active {
  animation: action1 300ms forwards;
}
</style>
