import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './Pages/Index'
import './assets/css/style.css'
import './assets/css/style-prefix.css'
import Header from './Layouts/Header'





const App = () => {
  return (
    <div>
      <Router>
        <Header /> 
        <Routes>
          <Route path='/' element={<Index />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
