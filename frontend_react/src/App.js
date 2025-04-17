import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <ul className="navbar-menu">
          <li><a href="#main">Main Menu</a></li>
          <li><a href="#workout-tracker">Workout Tracker</a></li>
          <li><a href="#calorie-counter">Calorie Counter</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <header className="app-header">
        <h1>Welcome to Workout Tracker</h1>
        <p>Track your workouts and achieve your fitness goals!</p>
      </header>
      <main className="app-main">
        <button className="cta-button">Get Started</button>
      </main>
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
