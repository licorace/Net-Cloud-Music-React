import React from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'

import '@/assets/css/reset.css'

import App from './App'

// ReactDOM.render(<App />, document.getElementById('root'))

const root = createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
