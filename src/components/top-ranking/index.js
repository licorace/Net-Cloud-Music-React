import React, { memo } from 'react'

import { TopRankingWrapper } from './style'

import { getSizeImage } from '@/utils/format-utils'

const HYTopRanking = memo((props) => {
  const { info } = props
  const { tracks = [] } = info

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
                  <button className="btn play sprite_02" title="播放"></button>
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
