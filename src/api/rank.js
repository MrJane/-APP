import Jsonp from '../assets/js/jsonp';
import axios from 'axios'
import {baseParams, options, ERR_OK} from './api.config';

export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
  const data = Object.assign({}, baseParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return Jsonp(url, data, options)
}

export function getDicListAjax () {
  const url = '/api/getDiscList'
  const data = Object.assign({}, baseParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
