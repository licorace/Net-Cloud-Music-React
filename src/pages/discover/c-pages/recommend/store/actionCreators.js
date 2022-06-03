import * as actionTypes from './constants'

import {
  UP_RANKING_ID,
  NEW_RANKING_ID,
  ORIGIN_RANKING_ID
} from '@/common/constants'

import {
  getTopBanners,
  getHotRecommends,
  getNewAlbums,
  getTopList
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

export const changeUpRankingAction = (playlist) => ({
  type: actionTypes.CHANGE_UP_RANKING,
  upRanking: playlist
})

export const changeNewRankingAction = (playlist) => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  newRanking: playlist
})

export const changeOriginRankingAction = (playlist) => ({
  type: actionTypes.CHANGE_ORIGIN_RANKING,
  originRanking: playlist
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

export const getTopListAction = (id) => {
  return (dispatch) => {
    getTopList(id).then((res) => {
      switch (id) {
        case UP_RANKING_ID:
          dispatch(changeUpRankingAction(res.playlist))
          break
        case NEW_RANKING_ID:
          dispatch(changeNewRankingAction(res.playlist))
          break
        case ORIGIN_RANKING_ID:
          dispatch(changeOriginRankingAction(res.playlist))
          break
        default:
      }
    })
  }
}
