<template>
  <div class="rank">
    <el-scroll class="top-list" :data="topList">
      <ul>
        <li class="item" v-for="(item,index) in topList">
          <div class="poster">
            <img :src="item.picUrl" alt="">
          </div>
          <ul class="song-list">
            <li class="song" v-for="(song,i) in item.songList">{{i +1}} {{song.songname}}-{{song.singername}}</li>
          </ul>
        </li>
      </ul>
    </el-scroll>
  </div>
</template>

<script>
  import {getTopList} from '../../api/rank'
  import Scroll from '../../component/base/scroll'

  export default {
    name: "Rank",
    data () {
      return {
        topList: []
      }
    },
    components: {
      'el-scroll': Scroll
    },
    mounted () {
      getTopList().then((res) => {
        if (res.code === 0) {
          this.topList = res.data.topList
        }
        console.log(res)
      })
    }
  }
</script>

<style lang="stylus" scoped>
  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .top-list
      height: 100%
      overflow: hidden
      ul
        li.item
          display flex
          width 100%
          height 100px
          /*background-color red*/
          padding-top 20px
          margin 0 20px
          .poster
            flex 0 0 100px
            width 100px
            height 100px
            img
              width 100%
          .song-list
            flex 1
            display flex
            flex-direction column
            justify-content center
            padding 0 20px
            background-color #333
            font-size 12px
            line-height 26px
            color rgba(255, 255, 255, 0.3)
            li
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              line-height: 26px;
</style>
