// 导入colorMap
import {_color} from'./colorMap'

export function color(value) {
  //返回一个实例
  return new Color(value);
}

// 利用Symbol定义私有属性和方法
let colorMap = Symbol('colorMap')
let rgb = Symbol('rgb')


class Color {
  //构造器
  constructor(value) {
    if (/^rgb/.test(value) || value.includes("#")) {
      this[colorMap] = _color;
      this.value = this[rgb](value);
    } else if (value in _color) {
      this[colorMap] = _color;
      this.value = this[rgb](this[colorMap][value])
    } else {
      throw Error(
        `[color]颜色参数错误：只接受yi-color、十六进制颜色码或RGB颜色值`
      );
    }
  }
  //最后调用，用于返回结果
  end(value='data') {
    if(value == 'data'){
      return this.value
    }
    if(value == 'rgb'){
      return `rgb(${this.value})`
    }
    if(value == 'rgba'){
      return `rgba(${this.value})`
    }
  }
  //私有方法
  [rgb](value) {
    // 如果传入的是16进制，进行转换
    if (value.includes("#")) {
      const color = value.replace("#", "");
      if (color.length == 3) {
        let a = [...color];
        let b = [...color].reverse();
        let s = [];
        for (let i = 0, j = 2; i < 3; i++, j--) {
          s.push(a[i]);
          s.push(b[j]);
        }
        let v = s.join("");
        let red = parseInt(v.slice(0, 2), 16);
        let green = parseInt(v.slice(2, 4), 16);
        let blue = parseInt(v.slice(4, 6), 16);
        return [red, green, blue].join(",");
      } else {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        return [red, green, blue].join(",");
      }
    } else {
      // 如果传入的是rgb
      return value.replace("rgb(", "").replace(")", "");
    }
  }
  //颜色透明度
  opacity(num) {
    if(typeof num != 'number'){
      throw Error('[color]color.opacity()方法需要接受一个Number类型的参数')
    }
    if(num>1 || num<0){
      throw Error('[color]color.opacity()方法的参数取值范围在0~1')
    }
    this.value = this.value + "," + num;
    return this;
  }
  //颜色变浅
  ligthen(num) {
    if(typeof num != 'number'){
      throw Error('[color]color.ligthen()方法需要接受一个Number类型的参数')
    }
    if(num<0 || num>255){
      throw Error('[color]color.ligthen()方法的参数取值范围在0~255')
    }
    let a = this.value.split(",").map((v) => {
      let r = Number(v) + num;
      return r > 255 ? 255 : r;
    });
    this.value = a.join(",");
    return this;
  }
  //颜色变深
  darken(num) {
    if(typeof num != 'number'){
      throw Error('[color]color.darken()方法需要接受一个Number类型的参数')
    }
    if(num<0 || num>255){
      throw Error('[color]color.darken()方法的参数取值范围在0~255')
    }
    let a = this.value.split(",").map((v) => {
      let r = Number(v) - num;
      return r < 0 ? 0 : r;
    });
    this.value = a.join(",");
    return this;
  }
  //颜色反转
  reverse(){
    let a = this.value.split(',')
    if(a.length == 4){
      throw Error('[color]执行过color.opacity()方法的颜色无法反转')
    }
    this.value = a.map(v=>{
      return 255 - Number(v)
    }).join(',')
    return this
  }
}




