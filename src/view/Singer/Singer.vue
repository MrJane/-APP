<template>
  <div class="singer">
    <el-scroll :data="singerList" class="listview" ref="listview">
      <ul>
        <li class="list-group" v-for="(singer,index) in singerList" :key="index" ref="listGroup">
          <h2 class="title">{{singer.title}}</h2>
          <ul>
            <li class="list-group-item" v-for="(item,i) in singer.items" :key="i" @click="selectSinger(item)">
              <img :src="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.id}.jpg?max_age=2592000`" alt="">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="list-shortcut">
        <ul>
          <li
            @touchstart.stop.prevent="onShortcutTouchStart($event,index)"
            class="item active"
            v-for="(itm,index) in shortcutList"
            @touchmove.stop.prevent="onShortcutTouchMove($event,index)"
          >{{itm}}
          </li>
        </ul>
      </div>
    </el-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import Scroll from '../../component/base/scroll'
  import {getSingerList} from '../../api/singer'

  export default {
    name: "Singer",
    created () {
      this.touch = {}
    },
    data () {
      return {
        singerList: []
      }
    },
    components: {
      'el-scroll': Scroll
    },
    mounted () {
      // console.log('hhahhahh')
      this._getSingerList()
      console.log(this,'this')
    },
    computed: {
      shortcutList () {
        return this.singerList.map((item, index) => {
          return item.title.substring(0, 1)
        })
      }
    },
    methods: {
      selectSinger (singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        });
        this.setSinger(singer)

        console.log(this.$store.state,'store');
      },
      onShortcutTouchStart (e, index) {
        //如果不做滑动需求 直接传index即可，做滑动需求？ 考虑开始的index 及滑动距离划过几个，可以在created钩子函数建个this.touch记录index
        console.log('Start', e, index);
        this.touch.y1 = e.touches[0].pageY
        this.touch.anchorIndex = index;
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        console.log(this.touch)
      },
      onShortcutTouchMove (e, index) {
        this.touch.y2 = e.touches[0].pageY;
        let distance = (this.touch.y2 - this.touch.y1) / 18 | 0 //计算滑动几个索引
        this.touch.anchorIndex = index;
        let detta = distance + this.touch.anchorIndex;
        this.$refs.listview.scrollToElement(this.$refs.listGroup[detta], 0)
        console.log('Move', e, index);
      },
      _getSingerList () {
        getSingerList().then((res) => {
          if (res.code === 0) {
            let list = res.data.list;
            let map = {
              hot: {
                title: '热门',
                items: []
              }
            };
            //整理数据成对象
            list.forEach((item, index) => {
              if (index < 10) {
                map.hot.items.push({
                  id: item.Fsinger_mid,
                  name: item.Fsinger_name,
                  avatar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                })
              }
              const key = item.Findex;
              if (!map[key]) {
                map[key] = {
                  title: key,
                  items: []
                }
              }
              map[key].items.push({
                id: item.Fsinger_mid,
                name: item.Fsinger_name,
                avatar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
              })
            });
            // 为了得到有序列表，我们需要处理 map变成字母排序
            let hot = [];
            let ret = [];
            for (let key in map) {
              let val = map[key]
              if (val.title.match(/[a-zA-Z]/)) {
                ret.push(val)
              } else if (val.title === '热门') {
                hot.push(val);
              }
            }
            ret.sort((a, b) => {
              return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            this.singerList = hot.concat(ret);
            console.log(this.singerList)
          }

        })
      },
      ...mapMutations({setSinger: 'SET_SINGER'})
    }
  }
</script>

<style lang="stylus" scoped>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
    .listview
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
      background: #222
      .list-shortcut
        position: absolute
        top: 50%
        transform: translateY(-50%)
        width: 20px
        padding: 20px 0
        border-radius: 10px
        right 0
        z-index 30
        text-align: center
        background-color rgba(0, 0, 0, 0.3)
        .item
          padding: 3px
          line-height: 1
          color: rgba(255, 255, 255, 0.5)
          font-size: 12px
          &.active
            color #ffcd32

    .list-group
      .title
        height 30px
        line-height 30px
        background-color #333
        font-size 12px
        padding-left 20px
        color rgba(255, 255, 255, 0.5)
      .list-group-item
        padding-left 30px
        padding-top 20px
        img
          width 50px
          height 50px
          border-radius 50%
          vertical-align middle
        span
          vertical-align middle
          margin-left 20px
          color rgba(255, 255, 255, 0.5)


</style>
