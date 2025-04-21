import React, {useState} from "react";
import Navbar from "../Navbar";
import axios from "axios";

function Home() {
    const [user, setUser] = useState('');
    const fetchUser = () => {
        axios.get("http://localhost:5000/api/accounts/login", {
            withCredentials: true
        })
        .then(response => {
            console.log(response.data);
            if(response.data.response.user !== undefined){
                setUser(response.data.response.user.email);
            }else{
                setUser('No user logged in');
            }
        })
        .catch(error => {
            console.log(error)
        });
    }

        return (
        <>
            <header className="app-header">
            <h1>Welcome to Workout Tracker</h1>
            <p>Track your workouts and achieve your fitness goals!</p>
            </header>
            <main className="app-main">
            <button className="cta-button">Get Started</button>
            <button className="cta-button" onClick={() => fetchUser()}>Check user</button>
            <p>Current user: {user}</p>
            </main>
        </>
        );
}

export default Home;