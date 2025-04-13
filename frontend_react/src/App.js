import React from 'react';
import './App.css';

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

export default App;
