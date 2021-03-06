import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,//播放
  fullScreen: false, //全屏播放
  playlist: [],//播放列表
  sequenceList: [],//顺序播放列表
  mode: playMode.sequence,
  currentIndex: -1,//当前播放索引
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
