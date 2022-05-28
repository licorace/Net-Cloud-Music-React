import React from 'react'

import HYDiscover from '../pages/discover'
import HYFriend from '../pages/friend'
import HYMine from '../pages/mine'

const routes = [
  {
    path: '/discover',
    element: <HYDiscover />
  },
  {
    path: '/mine',
    element: <HYMine />
  },
  {
    path: '/friend',
    element: <HYFriend />
  }
]

export default routes
