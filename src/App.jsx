import React from 'react'
import Admin from './admin/Admin'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Login from './admin/Login'
import Photos from './components/Photos'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <div>
        <Photos/>
      </div>
    </>
  )
}

export default App