const path = require('path');
module.exports  ={
  //修改入口
  pages:{
    index:{
      entry:'examples/main.js',
      template:'public/index.html',
      filename:'index.html'
    }
  },
  // 将packages加入webpack编译
  chainWebpack:config=>{
    config.module
      .rule('js')
      .include
        .add('/packages')
        .end()
      .use('babel')
        .loader('babel-loader')
        .tap(options=>{
          return options
        })
  },
  // 重置别名
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'examples'),
      }
    }
  },
}
