import React from "react";
import Navbar from "../Navbar";

function Home() {
    return (
      <>
        <header className="app-header">
          <h1>Welcome to Workout Tracker</h1>
          <p>Track your workouts and achieve your fitness goals!</p>
        </header>
        <main className="app-main">
          <button className="cta-button">Get Started</button>
        </main>
      </>
    );
}

export default Home;