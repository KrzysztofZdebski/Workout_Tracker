import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../utils/api"; // Import the configured axios instance
import Cookies from 'js-cookie';
import AuthContext from "../../utils/AuthProvider"; // Import the AuthContext
import Logout from "../Logout";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize the navigate function

    function loginUser(event) {
        event.preventDefault(); 
        const loginData = {
            username: username,
            password: password
        };

        axios.post("/auth/login", loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                // withCredentials: true
        })
        .then(response => {
            console.log(response);
            console.log(response.data); // Log the response to see its structure
            if (response.status === 200) {
                const newAccessToken = response.data.access_token;
                localStorage.setItem('access_token', newAccessToken);
                setAuthenticated(true); // Set the authenticated state to true
                navigate('/account'); // Redirect to the main page
            } else {
                alert("Login failed. Please check your credentials.");
            }
        })
        .catch(error => {
            console.error("There was an error logging in!", error);
            alert("An error occurred. Please try again later.");
        });
    }


    return (
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="username" id="username" required onChange={(event) => setUsername(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" required onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <button type="submit" onClick={(event) => loginUser(event)}>Login</button>
        </form>
      </div>
    );
}

export default Login;