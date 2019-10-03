import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/view/Rank/Rank'
import Search from '@/view/Search/Search'
import Recommend from '@/view/Recommend/Recommend'
import Singer from '@/view/Singer/Singer';
import SingerDetail from '@/view/singerDetail/singerDetail'
import User from '@/view/user/user'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect: '/recommend', component: Rank},
    {path: '/rank', name: 'rank', component: Rank},
    {path: '/search', name: 'search', component: Search},
    {path: '/recommend', name: 'recommend', component: Recommend},

    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [
        {path:':id',component:SingerDetail}]
    },
    {path: '/user', name: 'user', component: User},
  ]
})
