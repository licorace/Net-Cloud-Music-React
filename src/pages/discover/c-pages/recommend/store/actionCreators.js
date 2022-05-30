import * as actionTypes from './constants'

import { getTopBanners } from '@/services/recommend'

export const changeTopBannerAction = (banners) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: banners
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
