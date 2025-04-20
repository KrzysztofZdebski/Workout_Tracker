import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/pages/Home';
import Login from './components/pages/Login';
import Navbar from './components/Navbar';
import CalorieCounter from './components/pages/Calorie_counter';

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
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
