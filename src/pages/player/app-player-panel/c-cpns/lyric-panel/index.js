import React, { memo, useRef, useEffect } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import classNames from 'classnames'

import { scrollTo, backToTop } from '@/utils/ui-helper'

import { PannelWrapper } from './style'

export default memo(function HYLyricPanel() {
  const { lyricList, currentLyricIndex } = useSelector(
    (state) => ({
      lyricList: state.getIn(['player', 'lyricList']),
      currentLyricIndex: state.getIn(['player', 'currentLyricIndex'])
    }),
    shallowEqual
  )

  // other hooks

  const panelRef = useRef()
  useEffect(() => {
    // console.log('index:', currentLyricIndex)
    // console.log('scrollTop:', panelRef.current.scrollTop)
    // console.log('totalLength:', lyricList.length - 1)

    // if (currentLyricIndex === lyricList.length - 1) return
    if (currentLyricIndex >= -1 && currentLyricIndex <= 3) {
      // console.log('我进入该函数啦~~~~~~~~~~~~~~~~')
      backToTop(lyricList, 10, panelRef)
      // setTimeout(() => {
      //   panelRef.current.scrollTop = 0
      // }, 200)
    } else if (currentLyricIndex === lyricList.length - 1) {
      panelRef.current.scrollTop += (currentLyricIndex - 3) * 32
    } else {
      scrollTo(panelRef.current, (currentLyricIndex - 3) * 32, 300)
    }
  }, [currentLyricIndex])

  return (
    <PannelWrapper ref={panelRef}>
      <div className="lrc-content">
        {lyricList.map((item, index) => {
          return (
            <div
              key={item.time}
              className={classNames('lrc-item', {
                active: index === currentLyricIndex
              })}
            >
              {item.content}
            </div>
          )
        })}
      </div>
    </PannelWrapper>
  )
})
