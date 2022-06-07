import request from './request'
import { LOGIN_COOKIE } from '../common/constants'

export function getSongDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids,
      cookie: LOGIN_COOKIE
    }
  })
}

export function getLyric(id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}
