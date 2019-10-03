<template>
  <div class="search">
    <div class="search-input">
      <i class="icon-search"></i>
      <input v-model="query" ref="query" class="box" :placeholder="placeholder"/>
      <i @click="clear" v-show="query" class="icon-dismiss"></i>
    </div>
    <div class="hot-wrapper">
      <div class="hot-key">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
            <span>{{item.k}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-result">
      <ul class="suggest-list">
        <li class="suggest-item">
          <div class="icon">
            <i></i>
          </div>
          <div class="name">
            <p class="text">dfd</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getHotKey, search} from '../../api/search'

  export default {
    name: "Search",
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data () {
      return {
        query: '',
        hotKey: [],
        page: 1
      }
    },
    mounted () {
      this._getHotKey()
    },
    methods: {
      clear () {
        this.query = ''
      },
      _getHotKey () {
        getHotKey().then((res) => {
          if (res.code === 0) {
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
          console.log(res)
        })
      },
      addQuery (query) {
        this.query = query;
      },
      _search () {
        console.log('hello world')
        search(this.query, this.page, true, 20).then(res => {
        })
      }
    },
    watch: {
      query () {
        this._search()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .search
    .search-input
      display flex
      align-items: center
      box-sizing: border-box
      height 40px
      margin 20px
      background-color #333
      border-radius 6px
      padding 0px 6px
      font-size 24px

      .icon-search
        color #222

      input
        flex 1
        margin: 0 5px
        line-height: 18px
        background #333
        color: #fff
        font-size: 14px

      .icon-dismiss
        font-size: 16px
        color: #222

    .hot-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      /*background rebeccapurple*/

      .hot-key
        margin: 0 20px 20px 20px

        .title
          margin-bottom: 20px
          font-size: 14px
          color: rgba(255, 255, 255, 0.5)

        .item
          display: inline-block
          padding: 5px 10px
          margin: 0 20px 10px 0
          border-radius: 6px
          background: #333
          font-size: 14px
          color: rgba(255, 255, 255, 0.3)

    .search-result
      /*background aqua*/
      position: fixed
      width: 100%
      top: 178px
      bottom: 0

      .suggest-list
        padding: 0 30

        .icon
          flex: 0 0 30px
          width: 30px

          [class^="icon-"]
            font-size: 14px
            color: rgba(255, 255, 255, 0.3)

        .suggest-item
          display flex
          align-items: center
          padding-bottom: 20px

</style>
