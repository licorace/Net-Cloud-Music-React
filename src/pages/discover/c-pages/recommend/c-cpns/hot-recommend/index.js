import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getHotRecommendAction } from '../../store/actionCreators'
import { HOT_RECOMMEND_LIMIT } from '@/common/constants'

import { HotRecommendWrapper } from './style'

import HYThemeHeaderRCM from '@/components/theme-header-rcm'
import HYSongCover from '@/components/songs-cover'

const HYHotRecommend = memo(() => {
  // state

  // redux hooks
  const { hotRecommends } = useSelector(
    (state) => ({
      hotRecommends: state.getIn(['recommend', 'hotRecommends'])
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  // 其他hooks
  useEffect(() => {
    // console.log('我运行啦')
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))
  }, [dispatch])

  // console.log('被渲染了')
  return (
    <div>
      <HotRecommendWrapper>
        <HYThemeHeaderRCM
          title="热门推荐"
          keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        />
        <div className="recommend-list">
          {hotRecommends.map((item, index) => {
            return <HYSongCover key={item.id} info={item}></HYSongCover>
          })}
        </div>
      </HotRecommendWrapper>
    </div>
  )
})

export default HYHotRecommend
