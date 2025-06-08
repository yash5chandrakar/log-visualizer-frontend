import React from 'react';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { About } from './pages/About';

function App() {
  return (
    <Router>
      <ToastContainer />
      <div className='d-flex'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
