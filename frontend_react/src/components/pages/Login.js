import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function loginUser(event) {
        event.preventDefault(); 
        const loginData = {
            email: email,
            password: password
        };

        axios.post("http://localhost:5000/api/accounts/login", loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
        })
            .then(response => {
                console.log(response);
                console.log(response.data); // Log the response to see its structure
                console.log("CSRF Token:", response.data.response.csrf_token);
                if (response.status === 200) {
                    alert("Login successful!");
                } else {
                    alert("Login failed. Please check your credentials.");
                }
            })
            .catch(error => {
                console.error("There was an error logging in!", error);
                alert("An error occurred. Please try again later.");
            });
    }

    function logoutUser(event) {
        event.preventDefault(); 
        const loginData = {
            email: email,
            password: password
        };

        axios.post("http://localhost:5000/api/accounts/logout", loginData,{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
        })
            .then(response => {
                console.log(response.data); // Log the response to see its structure
                console.log('logged out')
            })
            .catch(error => {
                console.error("There was an error logging out!", error);
                alert("An error occurred. Please try again later.");
            });
    }

    return (
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required onChange={(event) => setEmail(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" required onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <button type="submit" onClick={(event) => loginUser(event)}>Login</button>
        </form>
        <button onClick={(event) => logoutUser(event)}>Logout</button>
      </div>
    );
}

export default Login;