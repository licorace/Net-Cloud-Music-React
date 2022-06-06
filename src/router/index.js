import React from 'react'
import { Navigate } from 'react-router-dom'

// const HYDiscover = React.lazy(() => import('@/pages/discover'))
// const HYRecommend = React.lazy((_) =>
//   import('../pages/discover/c-pages/recommend')
// )
// const HYRanking = React.lazy((_) => import('../pages/discover/c-pages/ranking'))
// const HYSongs = React.lazy((_) => import('../pages/discover/c-pages/songs'))
// const HYDjradio = React.lazy((_) => import('../pages/discover/c-pages/djradio'))
// const HYArtist = React.lazy((_) => import('../pages/discover/c-pages/artist'))
// const HYAlbum = React.lazy((_) => import('../pages/discover/c-pages/album'))
// const HYPlayer = React.lazy((_) => import('../pages/player'))

// const HYFriend = React.lazy((_) => import('../pages/friend'))
// const HYMine = React.lazy((_) => import('../pages/mine'))

import HYDiscover from '../pages/discover'
import HYRecommend from '../pages/discover/c-pages/recommend'
import HYRanking from '../pages/discover/c-pages/ranking'
import HYSongs from '../pages/discover/c-pages/songs'
import HYDjradio from '../pages/discover/c-pages/djradio'
import HYArtist from '../pages/discover/c-pages/artist'
import HYAlbum from '../pages/discover/c-pages/album'
import HYPlayer from '../pages/player'

import HYFriend from '../pages/friend'
import HYMine from '../pages/mine'

const routes = [
  {
    path: '/',
    element: <Navigate to="/discover" replace={true} />
  },
  {
    path: '/discover',
    element: <HYDiscover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" replace={true} />
      },
      // {
      //   path: '/discover',
      //   element: <HYRecommend />
      // },
      {
        path: '/discover/recommend',
        element: <HYRecommend />
      },
      {
        path: '/discover/ranking',
        element: <HYRanking />
      },
      {
        path: '/discover/songs',
        element: <HYSongs />
      },
      {
        path: '/discover/djradio',
        element: <HYDjradio />
      },
      {
        path: '/discover/artist',
        element: <HYArtist />
      },
      {
        path: '/discover/album',
        element: <HYAlbum />
      },
      {
        path: '/discover/player',
        element: <HYPlayer />
      }
    ]
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
