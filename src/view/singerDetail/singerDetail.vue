<template>
  <transition name="slide">
    <el-list @select="selectChange" :title="singer.name" :bg-image="singer.avatar" :songs="songs"></el-list>
    <!--<div class="detail">-->
    <!--<div class="music-list">-->
    <!--<div class="back">-->
    <!--<i class="icon-back"></i>-->
    <!--</div>-->
    <!--<div class="title">周杰伦</div>-->
    <!--<div class="bg-image">-->
    <!--<div class="play-wrapper">-->
    <!--<div class="play">-->
    <!--<i class="icon-play"></i><span>随机播放全部</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="list">-->
    <!--<ul>-->
    <!--<li class="list-item">-->
    <!--<div class="rank" v-show="false">-->
    <!--<i class="icon"></i>-->
    <!--</div>-->
    <!--<div class="content">-->
    <!--<div class="name">告白气球</div>-->
    <!--<div class="desc">周杰伦·周杰伦的床边故事</div>-->
    <!--</div>-->
    <!--</li>-->
    <!--<li class="list-item">-->
    <!--<div class="rank" v-show="false">-->
    <!--<i class="icon"></i>-->
    <!--</div>-->
    <!--<div class="content">-->
    <!--<div class="name">告白气球</div>-->
    <!--<div class="desc">周杰伦·周杰伦的床边故事</div>-->
    <!--</div>-->
    <!--</li>-->
    <!--<li class="list-item">-->
    <!--<div class="rank" v-show="false">-->
    <!--<i class="icon"></i>-->
    <!--</div>-->
    <!--<div class="content">-->
    <!--<div class="name">告白气球</div>-->
    <!--<div class="desc">周杰伦·周杰伦的床边故事</div>-->
    <!--</div>-->
    <!--</li>-->
    <!--<li class="list-item">-->
    <!--<div class="rank" v-show="false">-->
    <!--<i class="icon"></i>-->
    <!--</div>-->
    <!--<div class="content">-->
    <!--<div class="name">告白气球</div>-->
    <!--<div class="desc">周杰伦·周杰伦的床边故事</div>-->
    <!--</div>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
  </transition>

</template>

<script>
    import {getSingerDetail} from '../../api/singer'
    import {mapGetters} from 'vuex'
    import {createSong} from '../../common/js/song'
    import MusicList from '../../component/base/musiclist'

    export default {
        name: "singerDetail",
        data() {
            return {
                songs: []
            }
        },
        components: {
            'el-list': MusicList
        },
        mounted() {
            this._getDetail()
        },
        computed: {
            ...mapGetters(['singer'])
        },
        methods: {
            _getDetail() {
                getSingerDetail(this.singer.id).then((res) => {
                    console.log(res, 'detail')
                    if (res.code === 0) {
                        this.songs = this._normalizeSongs(res.data.list);
                        console.log('this.songs', this.songs)
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = [];
                list.forEach((item, index) => {
                    let {musicData} = item;
                    if (musicData.songid && musicData.albummid) {
                        ret.push(createSong(musicData))
                    }
                })
                return ret
            },
            selectChange(song,index) {
                console.log(song);
                console.log(index);
            }
        }
    }
</script>

<style lang="stylus" scoped>
  .detail
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

      .icon-back
        display: block
        padding: 10px
        font-size: 22px
        color: #ffcd32

    .title
      position absolute
      top 0
      left 10%
      width 80%
      z-index 40
      text-align center
      line-height 42px
      font-size 18px

    .list
      /*background-color red*/
      padding 20px 30px

      .list-item
        height 64px
        display flex
        align-items center
        font-size 14px

        .rank
          flex 0 0 25px
          width 25px
          background-color green
          margin-right 30px

          .icon
            display inline-block
            width 25px
            height 24px
            background-size 25px 24px

        .content
          flex 1
          line-height 20px

          .name
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;

          .desc
            margin-top: 4px;
            color: rgba(255, 255, 255, 0.3);

    .bg-image
      position relative
      width 100%
      height 0
      padding-top 70%
      transform-origin top
      background-repeat no-repeat
      background-size cover
      /*写成background 会重复*/
      background-image url("https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000")

      .play-wrapper
        position absolute
        bottom 20px
        width 100%

        .play
          width 135px
          border 1px solid #ffcd32
          margin auto
          padding 7px 0
          border-radius 100px
          text-align center
          color #ffcd32

          .icon-play
            font-size 16px
            vertical-align middle

          span
            font-size 12px
            vertical-align middle

  .slide-enter-active, .slide-leave-active
    transition all .3s

  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
