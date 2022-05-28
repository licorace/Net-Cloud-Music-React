import React, { memo } from 'react'
import { HashRouter as Router, useRoutes } from 'react-router-dom'

import HYAppFooter from './components/app-footer'
import HYAppHeader from './components/app-header'
import routes from './router'

const App = memo(() => {
  const GetRoutes = () => useRoutes(routes)
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
