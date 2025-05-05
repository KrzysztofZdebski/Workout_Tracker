import React, {useState} from "react";
import Navbar from "../Navbar";
import axios from "axios";
import Cookies from 'js-cookie';
import api from "../../utils/api";

function Home() {
    const [user, setUser] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [email, setEmail] = useState('');
    const fetchUser = () => {
        api.get("/auth/login")
        .then(response => {
            console.log(response);
            console.log(response.data);
            if(response.data.username !== undefined){
                setUser(response.data.username);
            }else{
                setUser('No user logged in');
            }
        })
        .catch(error => {
            console.log(error)
        });
        setCsrfToken(Cookies.get('csrf_refresh_token'));
        setAccessToken(localStorage.getItem('access_token'));
        setEmail((JSON.parse(atob(accessToken.split('.')[1]))).email);
    }
    const deleteToken = () => {
        localStorage.removeItem('access_token');
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
            <button className="cta-button" onClick={() => deleteToken()}>Delete token</button>
            <p>Current user: {user}</p>
            <p>access: {accessToken}</p>
            <p>csrf: {csrfToken}</p>
            <p>email: {email}</p>
            </main>
        </>
        );
}

export default Home;