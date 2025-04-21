import React, { use } from "react";
import axios from "axios";

function Register() {
    function registerUser(email, password) {
        const loginData = {
            email: email,
            password: password
        };

        axios.post("http://localhost:5000/api/accounts/register", loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
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

    const submitRegister = (event) => {
        event.preventDefault(); // Prevent form submission and page reload
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) {
            registerUser(email, password);
        } else {
            alert("Please fill in all fields.");
        }
    }

    return (
      <div className="login-container">
        <h2>Register</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit" onClick={submitRegister}>Register</button>
        </form>
      </div>
    );
}

export default Register;