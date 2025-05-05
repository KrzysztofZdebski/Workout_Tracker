import React from 'react';
import Cookies from 'js-cookie';
import api from "../utils/api"; // Import the configured axios instance
import { useContext } from 'react';
import axios from "axios";
import AuthContext from "../utils/AuthProvider"; // Import the AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Logout(){
    const {setAuthenticated} = useContext(AuthContext); // Import the AuthContext
    const navigate = useNavigate(); // Initialize the navigate function

    async function logoutUser(event) {
        event.preventDefault(); 
        const csrfToken = Cookies.get('csrf_refresh_token'); 

        await api.delete("/auth/logout/access")
        .then(response => {
            console.log(response.data); 
            console.log('logged out access token');
        })
        .catch(error => {
            console.error("There was an error logging out!", error);
            alert("An error occurred. Please try again later.");
        });
        localStorage.removeItem('access_token'); 
        await axios.delete("/auth/logout/refresh", {
            headers: {
                'X-CSRF-Token': csrfToken, 
            },
            withCredentials: true
        })
        .then(response => {
            console.log(response.data); 
            console.log('logged out refresh token');
            setAuthenticated(false); // Set the authenticated state to false
            navigate('/'); // Redirect to the main page
        })
        .catch(error => {
            console.error("There was an error logging out!", error);
            alert("An error occurred. Please try again later.");
        });

    }

    return <button onClick={(event) => logoutUser(event)}>Logout</button>
}

export default Logout;