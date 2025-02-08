import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/templates/Login.jsx';
import Home from './pages/templates/Home.jsx';
import Compiler from './components/Compiler.jsx';
import Articles from './pages/templates/Articles.jsx';
import Policies from './pages/templates/Policies.jsx';
import About from './pages/templates/About.jsx';
import Contact from './pages/templates/Contact.jsx';

function App() {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Navigate to="/Login" replace />} />
        <Route path='/Login' element={<Login />} />

        <Route path='/App' element={<Compiler />}>
        <Route path='*' element={<Navigate to="/Login" replace />} />
          <Route path='Home' element={<Home />} />
          <Route path='Articles' element={<Articles />} />
          <Route path='Policies' element={<Policies />} />
          <Route path='About' element={<About />} />
          <Route path='Contact' element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
