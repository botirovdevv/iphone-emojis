import React, { useEffect, useState } from 'react'
import { routes } from './helpers/routes'
import { Route, Routes } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';


const App = () => {
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
 
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 5500); 

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="app-container">
        {loading ? (
          <div className="loader-container">
            <ClipLoader color="#3498db" size={50} />
          </div>
        ) : (
          <Routes>
            {routes.map((item) => (
              <Route path={item.path} element={item.element} key={item.path} />
            ))}
          </Routes>
        )}
      </div>
    </>
  )
}

export default App