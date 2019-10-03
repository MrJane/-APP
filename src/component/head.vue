<template>
  <div class="head">
    <div class="icon"></div>
    <div class="title">MrJane Music</div>
    <div class="mine">
      <i class="icon-mine" @click="toUser"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "el-head",
    methods: {
      toUser () {
        this.$router.push({
          path: '/user'
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .head
    position relative
    height 44px
    color #ffcd32
    font-size 0
    text-align center
    .icon
      display inline-block
      margin-right 16px
      width 30px
      height 32px
      background-image url("./images/logo@2x.png")
      background-size 30px 32px
      vertical-align top
      margin-top 6px
    .title
      display inline-block
      font-size 16px
      vertical-align top
      line-height 44px
    .mine
      position absolute
      top 0
      right 0
      .icon-mine
        /*要设置display block 不然顶部对齐了*/
        display block
        font-size 20px
        padding 12px


</style>
