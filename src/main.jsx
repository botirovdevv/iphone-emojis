import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/index.css'
import { PhotosProvider } from './service/context/PhotosContext.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PhotosProvider>
      <App />
    </PhotosProvider>
  </BrowserRouter>
)
