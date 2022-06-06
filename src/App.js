import React, { memo, useLayoutEffect } from 'react'
import { Provider } from 'react-redux'

import routes from './router'
import store from './store'

import {
  HashRouter as Router,
  useRoutes,
  useLocation,
  useNavigate
} from 'react-router-dom'

import HYAppFooter from './components/app-footer'
import HYAppHeader from './components/app-header'
import HYAppPlayerBar from './pages/player/app-player-bar'

const App = memo(() => {
  const GetRoutes = () => {
    const location = useLocation()
    // console.log(location)
    const navigate = useNavigate()

    useLayoutEffect(() => {
      if (location.pathname === '/discover') {
        navigate('./discover/recommend', { replace: true })
      }
      if (location.pathname === '/mine') {
        const headerel = document.querySelector('.app-header')
        // console.log(headerel)
        headerel.setAttribute(
          'style',
          'position:sticky;top:0;left:-15px;z-index:1000;display:block'
        )

        const footerel = document.querySelector('.app-footer')
        footerel.setAttribute('style', 'display:none')
        // const rootel = document.querySelector('#root')
        // console.log(rootel)
        // rootel.setAttribute('style', 'display:flex;flex-direction:column;')
        // const middle = document.querySelector('.content')
        // console.log(middle)
        // middle.setAttribute('style', 'flex-grow:1')
      }
    }, [location.pathname])

    // useLayoutEffect(() => {
    //   console.log(location)
    //   if (location.pathname === '/mine') {
    //     navigate('./discover', {
    //       replace: true,
    //       state: {
    //         name: 'why',
    //         age: 18,
    //         height: 1.88
    //       }
    //     })
    //   }
    //   // document.title = 'counter'
    //   const newDiv = document.createElement('div')

    //   // and give it some content
    //   const newContent = document.createTextNode('Hi there and greetings!')

    //   // add the text node to the newly created div
    //   newDiv.appendChild(newContent)
    //   const el = document.querySelector('h2')
    //   const friendel = document.querySelector('#friend')

    //   el?.setAttribute('style', 'color: red')
    //   // console.log(el)
    //   // console.log(friendel)
    //   friendel?.insertBefore(newDiv, el)
    // })

    return useRoutes(routes)
  }

  return (
    <Provider store={store}>
      <Router>
        <HYAppHeader />
        <GetRoutes />
        <HYAppFooter />
        <HYAppPlayerBar />
      </Router>
    </Provider>
  )
})

export default App
