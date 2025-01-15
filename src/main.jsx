import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/index.css'
import { BrowserRouter } from 'react-router-dom'
import { PhotosProvider } from './context/PhotosContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PhotosProvider>
      <App />
    </PhotosProvider>
  </BrowserRouter>
)
