<template>
  <div id="app">
    <s-carousel autoplay :interval=2000>
      <s-carousel-item v-for="(item,index) of imgs" :key='index'>
        <!-- <div :style="{backgroundColor:item,width:'900px',height:'600px'}"></div> -->
        <img :src="item">
      </s-carousel-item>
    </s-carousel>
  </div>
</template>

<script>
import a from './assets/img/bg1.jpg'
import b from './assets/img/bg2.jpg'
import c from './assets/img/bg3.jpg'
import d from './assets/img/bg4.jpg'
import e from './assets/img/bg5.jpg'
export default {
  name: 'App',
  data(){
    return{
      value:true,
      color:[
        '#2b2a2a',
        '#FBC02D',
        '#f44336',
        '#1867C0',
        '#4CAF50'
      ],
      imgs:[a,b,c,d,e]
    }
  }
}
</script>

<style lang="scss">
html,body{
  margin:0;
  padding:0;
}
#app {
  width:100vw;
  height:100vh;
  background-color: #464646;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
}
img{
  height: 600px;
  width: 900px;
}
</style>
