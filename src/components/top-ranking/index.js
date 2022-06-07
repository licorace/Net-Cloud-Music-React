import React, { memo, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { getSizeImage } from '@/utils/format-utils'
// import { getSongDetailAction } from '@/pages/player/store'
import {
  getSongDetailAction,
  changeToPlayOrPauseAction
} from '@/pages/player/store'

import { TopRankingWrapper } from './style'

const HYTopRanking = memo((props) => {
  // props and state
  const { info } = props
  const { tracks = [] } = info

  // redux hooks
  const { isPlaying } = useSelector(
    (state) => ({
      isPlaying: state.getIn(['player', 'isPlaying'])
    }),
    shallowEqual
  )

  const dispatch = useDispatch()

  // other handle
  const playMusic = useCallback((item) => {
    dispatch(getSongDetailAction(item.id))

    const el = document.querySelector('audio')
    el.setAttribute('autoplay', 'true')
    const playbtnel = document.querySelector('.content button.global_play_btn')
    dispatch(changeToPlayOrPauseAction(!isPlaying))
    if (playbtnel.classList.value.indexOf('pause') !== -1) {
      // console.log(playbtnel.classList.value)
      playbtnel.classList.replace('pause', 'ply')
    }
  }, [])

  return (
    <TopRankingWrapper>
      <div className="header">
        <div className="image">
          <img src={getSizeImage(info.coverImgUrl)} alt=""></img>
          <a href="/todo" className="image_cover" title={info.name}>
            ranking
          </a>
        </div>
        <div className="info">
          <a href="/todo" title={info.name}>
            {info.name}
          </a>
          <div>
            <button className="btn play sprite_02" title="播放"></button>
            <button className="btn favor sprite_02" title="收藏"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item, index) => {
          return (
            <div key={item.id} className="list-item">
              <div className="rank">{index + 1}</div>
              <div className="info">
                <a className="name" title={item.name}>
                  {item.name}
                </a>
                <div className="operate">
                  <button
                    className="btn play sprite_02"
                    title="播放"
                    onClick={(e) => playMusic(item)}
                  ></button>
                  <button
                    className="btn addto sprite_icon2"
                    title="添加到播放列表"
                  ></button>
                  <button className="btn favor sprite_02" title="收藏"></button>
                </div>
              </div>
              <div></div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="/todo">查看全部&gt;</a>
      </div>
    </TopRankingWrapper>
  )
})

export default HYTopRanking
