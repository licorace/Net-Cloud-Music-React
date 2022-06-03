import React, { memo, useEffect, useRef } from 'react'

import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { Carousel } from 'antd'
import HYThemeHeaderRCM from '@/components/theme-header-rcm'
import HYAlbumCover from '@/components/album-cover'
import { getNewAlbumAction } from '../../store/actionCreators'
import { AlbumWrapper } from './style'

const HYNewAlbum = memo(() => {
  // redux hooks
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(['recommend', 'newAlbums'])
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  // react hooks
  const albumRef = useRef()
  useEffect(() => {
    dispatch(getNewAlbumAction(10))
  }, [dispatch])

  return (
    <AlbumWrapper>
      <HYThemeHeaderRCM title="新碟上架" />
      <div className="content">
        <button
          className="arrow arrow-left sprite_02"
          onClick={() => albumRef.current.prev()}
        ></button>
        <div className="album">
          <Carousel dots={false} ref={albumRef} lazyLoad={true} speed="1600">
            {[0, 1].map((item) => {
              return (
                <div key={item} className="page">
                  {newAlbums.slice(item * 5, (item + 1) * 5).map((iten) => {
                    return (
                      <HYAlbumCover
                        key={iten.id}
                        info={iten}
                        size={100}
                        width={118}
                        bgp={'-570px'}
                      />
                    )
                  })}
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="arrow arrow-right sprite_02"
          onClick={() => albumRef.current.next()}
        ></button>
      </div>
    </AlbumWrapper>
  )
})

export default HYNewAlbum
