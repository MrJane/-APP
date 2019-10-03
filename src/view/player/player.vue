<template>
  <div class="player">
    <!--展开的播放器-->
    <div class="normal-player" v-show="false">
      <div class="background">
        <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG.jpg?max_age=2592000" alt="">
      </div>
      <div class="top">
        <div class="back">
          <i class="icon-back"></i>
        </div>
        <div class="title">周杰伦</div>
        <div class="subtitle">叶惠美</div>
      </div>
      <div class="middle">
        <div class="middle-cd">
          <div class="cd-wrapper">
            <div class="cd play">
              <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000DMpJ73yeITP.jpg?max_age=2592000" alt="">
            </div>
          </div>
        </div>
        <div class="middle-lric"></div>
      </div>
      <div class="bottom">
        <div class="dots">
          <span class="dot active"></span>
          <span class="dot"></span>
        </div>
        <div class="progress">
          <span class="time time-s">0:00</span>
          <div class="progress-bar-box">
            <div class="progress-bar">
              <div class="bar-inner">
                <div class="progress"></div>
                <div class="progress-btn-box">
                  <div class="progress-btn"></div>
                </div>
              </div>
            </div>
          </div>
          <span class="time time-e">4:10</span>
        </div>
        <div class="operators">
          <div class="icon text-right">
            <i class="icon-sequence"></i>
          </div>
          <div class="icon text-right">
            <i class="icon-prev"></i>
          </div>
          <div class="icon text-center">
            <i class="icon-pause"></i>
          </div>
          <div class="icon text-left">
            <i class="icon-next"></i>
          </div>
          <div class="icon text-left">
            <i class="icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    <!--收起展示在底部的播放器-->
    <div class="min-player">
      <div class="icon">
        <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000QgFcm0v8WaF.jpg?max_age=2592000" alt="">
      </div>
      <div class="text">
        <h2 class="name">其实</h2>
        <p class="desc">薛之谦</p>
      </div>
      <div class="control">
        <div class="cycle">
          <i class="icon-mini icon-play-mini"></i>
        </div>
      </div>
      <div class="control"><i class="icon-playlist"></i></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "player"
  }
</script>

<style lang="stylus" scoped>
  .player
    .normal-player
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      background: #222;
      .background
        position absolute
        left 0
        right 0
        width 100%
        height 100%
        opacity: 0.6;
        filter: blur(20px);
        img
          width 100%
          height 100%
      .top
        position relative
        .title
          width 80%
          margin 0 auto
          text-align center
          color #fff
          font-size 18px
          line-height 40px
        .subtitle
          text-align center
          color #fff
          font-size 14px
          line-height 20px
        .back
          position absolute
          top 0
          left 6px
          .icon-back
            display: block
            padding: 10px
            font-size: 22px
            color: #ffcd32
      .middle
        position fixed
        width 100%
        top 80px
        bottom 170px
        font-size 0
        .middle-cd
          position relative
          width 100%
          padding-top 80%
          height 0
          .cd-wrapper
            position absolute
            top 0
            left 10%
            width 80%
            height 100%
            .cd.play
              width 100%
              height 100%
              box-sizing border-box
              border 10px solid rgba(255, 255, 255, 0.1)
              border-radius 50%
              overflow hidden
              animation rotate 20s linear infinite;
              img
                width 100%
                height 100%
      .bottom
        position absolute
        bottom 50px
        width 100%
        .dots
          text-align center
          .dot
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            &.active
              width: 20px;
              border-radius: 5px;
              background: rgba(255, 255, 255, 0.8);

        .progress
          display flex
          width 80%
          margin 0 auto
          align-items center
          .progress-bar-box
            flex 1
            .progress-bar
              height 30px
              .bar-inner
                position relative
                top 13px
                height 4px
                background-color #222
                .progress-btn-box
                  position absolute
                  top -13px
                  left -8px
                  width 30px
                  height 30px
                  .progress-btn
                    position relative
                    top 7px
                    left 7px
                    width 16px
                    height 16px
                    border-radius 50%
                    border 3px solid #fff
                    box-sizing border-box
                    background #ffcd32
                .progress
                  width 30%
                  height 100%
                  position absolute
                  top 0
                  left 0
                  background-color #ffcd32
          .time
            font-size 12px
            &.time-e
              flex: 30px 0 0;
              text-align right
            &.time-s
              flex: 0 0 30px;
              text-align left
        .operators
          display flex
          align-items center
          .text-right
            text-align right
          .text-center
            text-align center
            padding 0 20px
          .text-left
            text-align left
          .icon-sequence, .icon-prev, .icon-next, .icon-not-favorite
            font-size 30px
          .icon-pause
            font-size 40px
          .icon
            flex: 1;
            color: #ffcd32;
    .min-player
      background-color #333
      height 60px
      position fixed
      bottom 0
      display flex
      width 100%
      align-items center
      .text
        display flex
        flex-direction column
        justify-content: center;
        flex: 1;
        line-height: 20px;
        .name
          margin-bottom: 2px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 14px;
          color: #fff;
        .desc
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
      .control
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;
        .cycle
          position relative
          width 32px
          height 32px
          border-radius 50%
          /*border 2px solid #ffcd32*/
          box-sizing border-box
          .icon-mini
            position absolute
            top:0
            left 0
            font-size 32px
            color rgba(255,205,49,0.5)
        .icon-playlist
          font-size: 30px;
          color: rgba(255,205,49,0.5);
      .icon
        flex: 0 0 40px;
        width: 40px;
        padding: 0 10px 0 20px;
        img
          height 40px
          width 40px
          border-radius 50%
          animation rotate 20s linear infinite;
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>

