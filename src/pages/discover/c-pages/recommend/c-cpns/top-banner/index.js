import React, { memo, useEffect, useRef, useState, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getTopBannerAction } from '../../store/actionCreators'

import { Carousel } from 'antd'
import {
  BannerWrapper,
  BannerLeft,
  BannerRight,
  BannerControl,
  CerouselBallDots
} from './style'

const TopBanner = memo(() => {
  // state
  const [currentIndex, setCurrentIndex] = useState(0)
  // 组件和redux关联:获取数据和进行操作
  const { topBanners } = useSelector(
    (state) => ({
      // topBanners: state.get('recommend').get('topBanners')
      topBanners: state.getIn(['recommend', 'topBanners'])
    }),
    shallowEqual
  )

  // 其他hooks
  const dispatch = useDispatch()

  const bannerRef = useRef()

  const bannerChange = useCallback((from, to) => {
    // console.log(from, to)
    setTimeout(() => {
      setCurrentIndex(to)
    }, 0)
  }, [])

  // 发送网络请求
  useEffect(() => {
    dispatch(getTopBannerAction)
  }, [dispatch])

  // 其他业务逻辑
  const bgImage =
    topBanners[currentIndex] &&
    topBanners[currentIndex].imageUrl + '?imageView&blur=40x20'

  const handleItemClick = (index) => {
    bannerRef.current.goTo(index)
    setCurrentIndex(index)
  }

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            dots={false}
            effect="fade"
            autoplay
            ref={bannerRef}
            beforeChange={bannerChange}
          >
            {topBanners.map((item, index) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  ></img>
                </div>
              )
            })}
          </Carousel>
          <CerouselBallDots>
            {topBanners.map((item, index) => (
              <div
                key={item.imageUrl}
                className={
                  'tab-item' + (index === currentIndex ? ' active' : '')
                }
                onClick={() => handleItemClick(index)}
              ></div>
            ))}
          </CerouselBallDots>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button
            className="btn left"
            onClick={(e) => bannerRef.current.prev()}
          ></button>
          <button
            className="btn right"
            onClick={(e) => bannerRef.current.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})

export default TopBanner
