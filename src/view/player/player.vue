<template>
  <!--  当选中的歌曲不为0时显示-->
  <div class="player" v-show="playlist.length>0">
    <!--展开的播放器-->
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG.jpg?max_age=2592000" alt="">
        </div>
        <div class="top">
          <div class="back" @click="goBack">
            <i class="icon-back"></i>
          </div>
          <div class="title">{{currentSong.name}}</div>
          <div class="subtitle">{{currentSong.singer}}</div>
        </div>
        <div class="middle">
          <div class="middle-cd">
            <div class="cd-wrapper">
              <div class="cd" :class="playing?'play':'pasue'">
                <img :src="currentSong.image" alt="">
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
            <span class="time time-s">{{format(currentTime)}}</span>
            <div class="progress-bar-box">
              <div class="progress-bar" ref="progressBar" @click="progressClick">
                <div class="bar-inner">
                  <!-- 进度条宽度可以用百分比也可以用px,用px就要计算progressBar的宽度-->
                  <!--                  <div class="progress" :style="{width:percent+'%'}"></div>-->
                  <div class="progress" ref="progress" :style="{width:percent+'px'}"></div>
                  <div class="progress-btn-box"
                       ref="progressBtn"
                       @touchstart.prevent="progressTouchStart"
                       @touchmove.prevent="progressTouchMove"
                       @touchend="progressTouchEnd"
                  >
                    <div class="progress-btn"></div>
                  </div>
                </div>
              </div>
            </div>
            <span class="time time-e">{{format(audioDuration)}}</span>
          </div>
          <div class="operators">
            <div class="icon text-right">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon text-right">
              <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon text-center">
              <i class="icon-pause" @click="togglePlay" :class="palyIcon"></i>
              <!--              <i class="icon-play" @click="openPlay"></i>-->
            </div>
            <div class="icon text-left">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon text-left">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!--收起展示在底部的播放器-->
    <transition name="mini">
      <div class="min-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :src="currentSong.image" alt="">
        </div>
        <div class="text">
          <h2 class="name">其实</h2>
          <p class="desc">薛之谦</p>
        </div>
        <div class="control">
          <div class="cycle">
            <i @click.stop="togglePlay" class="icon-mini" :class="miniIcon"></i>
          </div>
        </div>
        <div class="control"><i class="icon-playlist"></i></div>
      </div>
    </transition>
    <audio @play="ready" ref="audio" src='/static/musci.mp3' @timeupdate="updateTime"></audio>
    <!--    <audio ref="audio" :src='currentSong.url'></audio>-->

  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    const progressBtnWidth = 16;//进度条按钮的宽度，16是样式定义的宽度
    export default {
        name: "player",
        computed: {
            ...mapGetters([
                'fullScreen',
                'playing',
                'playlist',
                'currentSong', //是用currentIndex取playlist
                'currentIndex'
            ]),
            palyIcon() {
                return this.playing ? 'icon-pause' : 'icon-play'
            },
            miniIcon() {
                return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
            },
            percent() {
                let width = this.$refs.progressBar ? this.$refs.progressBar.clientWidth-progressBtnWidth : 0
                console.log(width, 'width')
                return (this.currentTime / this.audioDuration) * width
            }
        },
        mounted() {
            // this.$nextTick(() => {
            //     console.log(this.$refs.audio, 'audio')
            //     this.audioDuration = this.$refs.audio ? this.$refs.audio.duration : 0
            // })
        },
        methods: {
            goBack() {
                console.log('back')
                this.$store.commit('SET_FULL_SCREEN', false)

            },
            open() {
                this.$store.commit('SET_FULL_SCREEN', true)
            },
            togglePlay() {
                console.log(this.playing);
                this.$store.commit('SET_PLAYING_STATE', !this.playing)
                // if (!this.playing) {
                //     this.$refs.audio.pause()
                // } else {
                //     this.$refs.audio.play()
                // }
            },
            //上一首下一首歌实现是利用改变currentIndex即改变currentSong
            prev() { //上一首歌曲
                console.log('上一首歌曲')
                let index = this.currentIndex - 1;
                if (index === -1) { //界限判断：第一首歌曲
                    index = this.playlist.length - 1
                }
                this.$store.commit('SET_CURRENT_INDEX', index)

            },
            ready() {
                this.$nextTick(() => {
                    console.log(this.$refs.audio, 'audio')
                    this.audioDuration = this.$refs.audio ? this.$refs.audio.duration : 0
                })
            },
            progressClick(e){
                console.log(e,'点击事件e')
                const rect = this.$refs.progressBar.getBoundingClientRect();
                console.log(rect,'rect');
            },
            progressTouchStart(e){
                console.log('start');
                this.touch.isTouched = true; //已经点击开始
                this.touch.startX = e.touches[0].pageX;
                console.log(this.touch.startX,'startX');
                this.touch.left = this.$refs.progress.clientWidth;//当前进度条的宽度
            },
            progressTouchMove(e){
                if (!this.touch.isTouched){
                    return
                }
                let delDataX = e.touches[0].pageX-this.touch.startX; //计算滑动的偏移距离
                //Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
                let offset = Math.min(this.$refs.progressBar.clientWidth-progressBtnWidth,Math.max(0,this.touch.left+delDataX));
                console.log(offset,'offset');
                console.log(this.$refs.progressBar.clientWidth,'pppppp');
                console.log(this.touch.left,'left');
                this.$refs.progressBtn.style.transform=`translate3d(${offset}px,0,0)`;
                this.$refs.progress.style.width=`${offset}px`;


                console.log('move')
            },
            progressTouchEnd(){
                console.log('end');
                this.touch.isTouched=false;
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                const percent = this.$refs.progress.clientWidth / barWidth;
                let times = this.$refs.audio ? this.$refs.audio.duration : 0
                const currentTime = times * percent;
                console.log(times,'总时长');
                console.log(currentTime,'currentTime');
                this.$refs.audio.currentTime = currentTime;

            },
            next() {//下一首歌曲
                console.log('下一首歌曲');
                let index = this.currentIndex + 1 //下一首歌
                if (index === this.playlist.length) { //界限判断：最后一首歌
                    index = 0
                }
                this.$store.commit('SET_CURRENT_INDEX', index)
                if (!this.playing) {
                    this.togglePlay()
                }
            },
            updateTime(e) {
                // console.log(e, '时间....');
                if (!this.touch.isTouched){
                    this.currentTime = e.target.currentTime
                }
                let width = this.$refs.progressBar ? this.$refs.progressBar.clientWidth-progressBtnWidth : 0;
                this.$refs.progressBtn.style.transform=`translate3d(${(this.currentTime / this.audioDuration) * width}px,0,0)`

            },
            format(interval) {
                interval = interval | 0
                const minute = interval / 60 | 0
                const second = this._pad(interval % 60);
                return `${minute}:${second}`
            },
            _pad(num, n = 2) {
                let len = num.toString().length
                while (len < n) {
                    num = '0' + num
                    len++
                }
                return num
            },
        },
        data() {
            return {
                currentTime: 0,
                audioDuration: 0,
                touch:{}
            }
        },
        watch: {
            currentSong() {
                this.$nextTick(() => {

                    this.$refs.audio.play()
                })
            },
            playing(newPlaying) {
                const audio = this.$refs.audio;
                this.$nextTick(() => {
                    newPlaying ? audio.play() : audio.pause()
                })
            },

        }
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

      &.normal-enter, &.normal-leave-to
        opacity: 0

        .top
          transform: translate3d(0, -100px, 0)

        .bottom
          transform: translate3d(0, 100px, 0)

      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s

        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)

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
            transform: rotate(-90deg)

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

            .cd
              width 100%
              height 100%
              box-sizing border-box
              border 10px solid rgba(255, 255, 255, 0.1)
              border-radius 50%
              overflow hidden

            .cd.pause
              animation-play-state: paused

            //暂停动画

            .cd.play
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
                  width 0%
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

      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s

      &.mini-enter, &.mini-leave-to
        opacity: 0

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
          color: rgba(255, 255, 255, 0.3);

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
            top: 0
            left 0
            font-size 32px
            color rgba(255, 205, 49, 0.5)

        .icon-playlist
          font-size: 30px;
          color: rgba(255, 205, 49, 0.5);

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

