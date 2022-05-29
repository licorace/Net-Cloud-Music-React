import React, { memo, useLayoutEffect } from 'react'
import {
  HashRouter as Router,
  useRoutes,
  useLocation,
  useNavigate
} from 'react-router-dom'

import HYAppFooter from './components/app-footer'
import HYAppHeader from './components/app-header'
import routes from './router'

const App = memo(() => {
  const GetRoutes = () => {
    const location = useLocation()
    // console.log(location)
    const navigate = useNavigate()

    useLayoutEffect(() => {
      if (location.pathname === '/discover') {
        navigate('./discover/recommend', { replace: true })
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
    <div>
      <Router>
        <HYAppHeader />
        <GetRoutes />
        <HYAppFooter />
      </Router>
    </div>
  )
})

export default App
