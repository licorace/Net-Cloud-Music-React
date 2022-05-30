import React from 'react'
import { Navigate } from 'react-router-dom'

import HYDiscover from '../pages/discover'
import HYFriend from '../pages/friend'
import HYMine from '../pages/mine'
import HYRecommend from '../pages/discover/c-pages/recommend'
import HYRanking from '../pages/discover/c-pages/ranking'
import HYSongs from '../pages/discover/c-pages/songs'
import HYDjradio from '../pages/discover/c-pages/djradio'
import HYArtist from '../pages/discover/c-pages/artist'
import HYAlbum from '../pages/discover/c-pages/album'

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
