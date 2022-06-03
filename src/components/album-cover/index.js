import React, { memo } from 'react'

import { getSizeImage } from '@/utils/format-utils'

import { AlbumWrapper } from './style'

const HYAlbumCover = memo((props) => {
  const { info, size = 130, width = 153, bgp = '-845px' } = props
  return (
    <AlbumWrapper size={size} width={width} bgp={bgp} info={info}>
      <div className="album-image">
        <img src={getSizeImage(info.picUrl, size)} alt={info.name}></img>
        <a href="/todo" className="cover sprite_covor" title={info.name}>
          {info.name}
        </a>
        <a href="/todo" className="icon-play sprite_icon" title="播放"></a>
      </div>
      <div className="album-info">
        <div className="name text-nowrap">{info.name}</div>
        <div className="artist text-nowrap">{info.artist.name}</div>
      </div>
    </AlbumWrapper>
  )
})

export default HYAlbumCover
