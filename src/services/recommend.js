import request from './request'
import { LOGIN_COOKIE } from '../common/constants'

export function getTopBanners() {
  return request({
    url: '/banner'
  })
}
export function getHotRecommends(limit) {
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}

export function getNewAlbums(limit) {
  return request({
    url: '/album/new',
    params: {
      limit
    }
  })
}

export function getTopList(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id,
      cookie: LOGIN_COOKIE
    }
  })
}

// export function getLoginStatus() {
//   return request({
//     url: '/login/status',
//     params: {
//       cookie: LOGIN_COOKIE
//     }
//   })
// }
