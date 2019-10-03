<template>
  <div class="user">
    <div class="back"></div>
  </div>
</template>

<script>
  export default {
    name: "user"
  }
</script>

<style lang="stylus" scoped>
  .user.ggg
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index 100
    background-color #222
    .back
      position absolute
      top 0
      left 6px
      z-index 40
</style>
