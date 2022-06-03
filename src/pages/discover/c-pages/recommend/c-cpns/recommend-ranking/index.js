import React, { memo, useEffect } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import HYThemeHeaderRCM from '@/components/theme-header-rcm'
import HYTopRanking from '@/components/top-ranking'
import { RankingWrapper } from './style'

import { getTopListAction } from '../../store/actionCreators'

import {
  UP_RANKING_ID,
  NEW_RANKING_ID,
  ORIGIN_RANKING_ID
} from '@/common/constants'

const HYRecommendRanking = memo(() => {
  // redux hooks
  const { upRanking, newRanking, originRanking } = useSelector(
    (state) => ({
      upRanking: state.getIn(['recommend', 'upRanking']),
      newRanking: state.getIn(['recommend', 'newRanking']),
      originRanking: state.getIn(['recommend', 'originRanking'])
    }),
    shallowEqual
  )

  const dispatch = useDispatch()

  // other hooks
  useEffect(() => {
    dispatch(getTopListAction(UP_RANKING_ID))
    dispatch(getTopListAction(NEW_RANKING_ID))
    dispatch(getTopListAction(ORIGIN_RANKING_ID))
  }, [dispatch])

  return (
    <RankingWrapper>
      <HYThemeHeaderRCM title="榜单" />
      <div className="tops">
        <HYTopRanking info={upRanking} />
        <HYTopRanking info={newRanking} />
        <HYTopRanking info={originRanking} />
      </div>
    </RankingWrapper>
  )
})

export default HYRecommendRanking
