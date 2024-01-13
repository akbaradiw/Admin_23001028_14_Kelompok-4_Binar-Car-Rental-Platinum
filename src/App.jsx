import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DashboardPage from './pages/DashboardPage'

import AddPage from './pages/AddPage'
import EditPage from './pages/EditPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />  
  
      <Route path="/add" element={<AddPage />} />
      <Route path="/edit" element={<EditPage />} />
     <Route path="/login" element={<LoginPage />} />

    </Routes>
  </BrowserRouter>
  )
}

export default App
