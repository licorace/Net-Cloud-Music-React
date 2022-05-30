import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

// import { connect } from 'react-redux'

import { getTopBannerAction } from './store/actionCreators'

const HYRecommend = (props) => {
  // 组件和redux关联:获取数据和进行操作
  const { topBanners } = useSelector(
    (state) => ({
      // topBanners: state.get('recommend').get('topBanners')
      topBanners: state.getIn(['recommend', 'topBanners'])
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  // 发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction)
  }, [dispatch])

  return (
    <div>
      <h2>HYRecommend:{topBanners.length}</h2>
    </div>
  )
}

export default memo(HYRecommend)

// const HYRecommend = (props) => {
//   const { getBanners, topBanners } = props

//   useEffect(() => {
//     getBanners()
//   }, [getBanners])

//   return (
//     <div>
//       <h2>HYRecommend:{topBanners.length}</h2>
//     </div>
//   )
// }

// const mapStateToProps = (state) => ({
//   topBanners: state.recommend.topBanners
// })

// const mapDispatchToProps = (dispatch) => ({
//   getBanners: () => {
//     dispatch(getTopBannerAction)
//   }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(memo(HYRecommend))
