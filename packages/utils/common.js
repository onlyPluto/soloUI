//获取当前页面元素'z-index'的最大值
export function getZindex() {
  let container = document.body.childNodes;
  return getComputedStyle(foo([...container]), null).getPropertyValue("z-index");
}
function foo(container /*body的全部子节点*/) {
  //新建一个临时元素作为reduce的初始值
  let temp = document.createElement("div");
  temp.style.zIndex = 1;
  return container.reduce((pre, cur) => {
    try {
      //获取上一个元素的样式'z-index'
      let pre_zIndex = getComputedStyle(pre, null).getPropertyValue("z-index");
      //获取当前元素的样式'z-index'
      let cur_zIndex = getComputedStyle(cur, null).getPropertyValue("z-index");
      // 获取当前元素的childNodes的个数
      let child = cur.childNodes.length;
      if (child == 0) {
        //没有子元素，直接返回两个元素中的较大值
        if (
          cur_zIndex == "auto" ||
          cur_zIndex == "inherit" ||
          Number(cur_zIndex) < 0
        ) {
          return pre;
        } else {
          return Number(pre_zIndex) > Number(cur_zIndex) ? pre : cur;
        }
      } else {
        // 有子元素，递归
        let result = foo([...cur.childNodes]);
        let result_zIndex = getComputedStyle(result, null).getPropertyValue(
          "z-index"
        );
        // 先比较当前元素与它的子元素的'z-index'哪个大
        if (
          cur_zIndex == "auto" ||
          cur_zIndex == "inherit" ||
          Number(cur_zIndex) < 0
        ) {
          return Number(pre_zIndex) > Number(result_zIndex) ? pre : result;
        } else if(Number(cur_zIndex)>Number(result_zIndex)){
          return Number(pre_zIndex) > Number(cur_zIndex) ? pre : cur;
        }else{
          return Number(pre_zIndex) > Number(result_zIndex) ? pre : result;
        }
        
      }
    } catch {
      return pre;
    }
  }, temp);
}
