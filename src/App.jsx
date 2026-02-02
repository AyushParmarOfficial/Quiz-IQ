import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css' 
import Home from './Pages/Home'
import {useSelector } from 'react-redux'
import Index from './Components/Layouts/Client'
import Web from './Routes/Web'

function App() {
  const themeMode = useSelector((state) => state.theme.mode);
 

  return (
    <>
      <div className={`app-container ${themeMode}`}>        
        <Web />
      </div>  
    </>
  )
}

export default App
