import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import Main from './components/pages/Home';
import Login from './components/pages/Login';
import Navbar from './components/Navbar';
import CalorieCounter from './components/pages/Calorie_counter';
import Register from './components/pages/Register';
import Account from './components/pages/Account';

function App() {
  return (
    <div className="app-container">
        <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/calorie_counter" element={<CalorieCounter />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
