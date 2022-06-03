import React, { memo } from 'react'

import { getCount, getSizeImage } from '@/utils/format-utils'

import { SongsCoverWrapper } from './style'

const HYSongCover = memo((props) => {
  const { info } = props
  return (
    <SongsCoverWrapper>
      <div className="cover-top">
        <img src={getSizeImage(info.picUrl, 140)} alt=""></img>

        <div className="cover sprite_covor" title={info.name}>
          <div className="info sprite_covor">
            <span>
              <i className="erji sprite_icon"></i>
              {getCount(info.playCount)}
            </span>
            <i className="play sprite_icon" title="播放"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">{info.name}</div>
      {/* <div className="cover-source text-nowrap">
        by {info.copywriter || info.creator?.nickname}
      </div> */}
    </SongsCoverWrapper>
  )
})

export default HYSongCover
