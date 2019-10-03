<template>
  <div class="tabs">
    <router-link class="tab-item" tag="div" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/singer">
      <span>歌手</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link class="tab-item" tag="div" to="/search">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "tabs"
  }
</script>

<style lang="stylus" scoped>
  .tabs
    display flex
    height 44px
    line-height: 44px
    .tab-item
      flex 1
      text-align center
      span
        padding-bottom 5px
      &.router-link-active
        color green
        span
          border-bottom 2px solid red
</style>
