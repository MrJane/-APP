<template>
  <div ref="scrollBox">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "scroll",
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      _initScroll () {
        this.scroll = new BScroll({
          probeType: this.probeType,
          click: this.click
        })
      }
    }
  }
</script>

<style scoped>

</style>
