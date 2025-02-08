import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Compiler from './components/Compiler'

function App() {


  return (
    <Router>
      <Routes>

        <Route path='/' element={<Navigate to="/Login" replace />} />
        <Route path='/Login' element={<Login />} />

        <Route path='/App' element={<Compiler />}>
        <Route path='*' element={<Navigate to="/Login" replace />} />
          <Route path='Home' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
