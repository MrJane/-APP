<template>
  <div class="recommend">
    <el-scroll :data="dicList" class="content">
      <div>
        <div class="slider-wrapper" v-if="sliderPic.length>0">
          <el-slider>
            <!--<div class="slider-item">hello</div>-->
            <!--<div class="slider-item">world</div>-->
            <!--<div class="slider-item">janetao</div>-->
            <div class="slider-item" v-for="(slider,index) in sliderPic">
              <a :href="slider.linkUrl">
                <img :src="slider.picUrl" alt="">
              </a>
            </div>
          </el-slider>
        </div>
        <div class="list">
          <h2>热门推荐</h2>
          <ul>
            <li @click="selectDic(dic)" v-for="(dic,index) in dicList">
              <div class="singer-avtar">
                <img :src="dic.imgurl"
                     alt="">
              </div>
              <div class="text">
                <p class="name">{{dic.creator.name}}</p>
                <p class="content">{{dic.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-scroll>

  </div>
</template>

<script>
  import {getRecommedAjax, getDicListAjax} from '../../api/recommend';
  import Slider from '../../component/base/slider'
  import Scroll from '../../component/base/scroll'

  export default {
    name: "Recommend",
    components: {
      'el-slider': Slider,
      "el-scroll": Scroll
    },
    data () {
      return {
        sliderPic: [],
        dicList: []
      }
    },
    mounted () {
      getRecommedAjax().then((res) => {
        if (res.code === 0) {
          this.sliderPic = res.data.slider;
          console.log(this.sliderPic);
        }
      })
      getDicListAjax().then((res) => {
        this.dicList = res.data.list;
        console.log(res, '热门推荐');
      })
    },
    methods: {
      selectDic (dic) {
        console.log(dic);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .recommend
    /*better-scroll滚动 需要 position fixed top  bottom 样式属性*/
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .content
      height 100%
      overflow hidden
    .list
      h2
        height 65px
        line-height 65px
        font-size 14px
        color #ffcd32
        text-align center
      ul
        li
          display flex
          padding 0px 20px 20px
          box-sizing border-box
          align-items center
          .singer-avtar
            width 60px
            flex 0 0 60px
            padding-right 20px
            img
              width 100%
          .text
            flex 1
            display flex
            flex-direction column
            justify-content center
            font-size 14px
            .content
              color rgba(255, 255, 255, 0.3)
            .name
              margin-bottom 10px
</style>
