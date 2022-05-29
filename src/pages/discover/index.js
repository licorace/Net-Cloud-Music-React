import React, { memo, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import { discoverMenu } from '@/common/local-data'
import request from '@/services/request'

import { DiscoverWrapper, TopMenu } from './style'

const HYDiscover = memo((props) => {
  useEffect(() => {
    request({
      url: '/banner'
    }).then((res) => {
      console.log(res)
    })
  })
  // console.log('被渲染了')
  return (
    <DiscoverWrapper>
      <div className="top">
        <TopMenu className="wrap-v1">
          {discoverMenu.map((item, index) => {
            return (
              <div key={item.title} className="item">
                <NavLink to={item.link}>{item.title}</NavLink>
              </div>
            )
          })}
        </TopMenu>
      </div>
      <Outlet />
    </DiscoverWrapper>
  )
})

export default HYDiscover
