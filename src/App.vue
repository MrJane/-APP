<template>
  <div id="app">
    <el-head></el-head>
    <el-tabs></el-tabs>
    <!--keep-alive 缓存组件-->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!--播放器组件业务需求上不是路由组件，因为可以从很多页面可以跳转过来，所以放在app底部-->
    <el-play></el-play>
  </div>
</template>

<script>
  import Head from './component/head'
  import Tabs from './component/tabs'
  import Player from './view/player/player';

  export default {
    name: 'App',
    components: {
      'el-head': Head,
      'el-tabs': Tabs,
      'el-play': Player
    }
  }
</script>

<style lang="stylus">
  @import "./assets/stylus/index.styl"
</style>
