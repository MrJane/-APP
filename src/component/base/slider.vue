<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(dot,index) in dots" :class="index==currentIndex?'active':''"></span>
      <!--<span class="dot"></span>-->
      <!--<span class="dot"></span>-->
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "slider",
    data () {
      return {
        dots: [],
        currentIndex: 0 //当前轮播选中的图片
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 1
      }
    },
    mounted () {
      this._initWidth();
      this._initSlider();
      this._initDots();
      //监听缩放事件，
      window.addEventListener('resize', () => {
        if (this.slider) {
          this._initWidth();
        }
        console.log('监听事件')
      })
    },
    methods: {
      _initWidth () {
        let width = 0;
        let children = this.$refs.sliderGroup.children;
        let sliderWidth = this.$refs.slider.clientWidth;
        for (let i = 0; i < children.length; i++) {
          let child = children[i];
          child.style.width = sliderWidth + 'px';
          width += sliderWidth
        }
        width += 2 * sliderWidth
        this.$refs.sliderGroup.style.width = width + 'px';
        console.log(this.$refs.sliderGroup.children)
        console.log(this.$refs.slider.clientWidth)
      },
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        });
        //监听滚动事件 具体看文档
        this.slider.on('scrollEnd', () => {
          //getCurrentPage返回对象里pageX 获取索引
          let index = this.slider.getCurrentPage().pageX;
          this.currentIndex = index - 1;
          //循环模式下也就上面前后添加两个元素时 index要减一个
          // console.log(index,'hahah')
        })
        // console.log(this.slider)
      },
      _initDots () {
        //根据this.$refs.sliderGroup.children的长度判断有多少个圆点
        this.dots = new Array(this.$refs.sliderGroup.children.length);
        console.log(this.dots, 'this.dots')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .slider
    min-height 1px
    width 100%
    overflow hidden
    position relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        background-color green
        float left
        overflow hidden
        text-align center
        a
          display block
          width 100%
          overflow hidden
          text-decoration none
        img
          width 100%
          display block
    .dots
      position absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: rgba(255, 255, 255, 0.5)
        &.active
          width 20px
          border-radius 4px
          background-color rgba(255, 255, 255, 0.8)

</style>
