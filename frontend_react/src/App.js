import React from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/pages/Home';

function App() {
  return (
    <div className="app-container">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

const login = async (email, password) => {
  try {
    const response = await axios.post('/api/accounts/login', {
      email,
      password,
    }, {
      withCredentials: true, // Include cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Handle successful login
  } catch (error) {
    // Handle login errors
  }
};

const logout = async () => {
  try {
    await axios.post('/api/accounts/logout', {}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Handle successful logout
  } catch (error) {
    // Handle logout errors
  }
};

export default App;
