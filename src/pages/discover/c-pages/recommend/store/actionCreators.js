import * as actionTypes from './constants'

import {
  getTopBanners,
  getHotRecommends,
  getNewAlbums
} from '@/services/recommend'

export const changeTopBannerAction = (banners) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: banners
})

export const changeHotRecommendAction = (result) => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  hotRecommends: result
})

export const changeNewAlbumAction = (albums) => ({
  type: actionTypes.CHANGE_NEW_ALBUM,
  newAlbums: albums
})

export const getTopBannerAction = (dispatch) => {
  // return (dispatch) => {
  //   getTopBanners().then((res) => {
  //     console.log(res)
  //   })
  // }
  getTopBanners().then((res) => {
    dispatch(changeTopBannerAction(res.banners))
  })
}

export const getHotRecommendAction = (limit) => {
  return (dispatch) => {
    getHotRecommends(limit).then((res) => {
      dispatch(changeHotRecommendAction(res.result))
    })
  }
}

export const getNewAlbumAction = (limit) => {
  return (dispatch) => {
    getNewAlbums(limit).then((res) => {
      dispatch(changeNewAlbumAction(res.albums))
    })
  }
}
