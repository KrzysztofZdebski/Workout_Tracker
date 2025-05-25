import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import authApi from "../utils/authApi";
import Cookies from 'js-cookie';
import AuthContext from "../utils/authProvider.js"; // Import the AuthContext
import Logout from "../components/Logout";
import Header from "../components/Header/index.js";
import Button from "../components/Button";
import { useTheme } from "next-themes";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthenticated} = useContext(AuthContext);
    const router = useRouter();
    const {theme, setTheme} = useTheme();

    function loginUser(event) {
        event.preventDefault(); 
        const loginData = {
            username: username,
            password: password
        };

        axios.post("http://localhost:5000/auth/login", loginData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
        })
        .then(response => {
            console.log(response);
            console.log(response.data); // Log the response to see its structure
            if (response.status === 200) {
                const newAccessToken = response.data.access_token;
                localStorage.setItem('access_token', newAccessToken);
                setAuthenticated(true); // Set the authenticated state to true
                router.push("/account") // Redirect to the main page
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
        <div className={`relative min-h-screen`}>
            <div className="gradient-circle"></div>
            <div className="gradient-circle-bottom"></div>
            <div className="container mx-auto mb-10">
                <Header />
                <div className="flex items-center justify-center pt-10">
                    <div className={`flex flex-col items-center w-full max-w-md p-8 ${theme === "dark" ? "bg-black" : "bg-white"} shadow-lg rounded-2xl`}>
                        <h2 className={`mb-6 text-3xl font-bold ${theme === "dark" ? "text-white" : "text-grey-800"}`}>Login</h2>
                        <form className="flex flex-col w-full gap-4">
                            <div className="flex flex-col gap-1 form-group">
                                <label htmlFor="username" className={`font-medium ${theme === "dark" ? "text-white" : "text-grey-800"}`}>Username:</label>
                                <input 
                                    type="text" 
                                    id="username" 
                                    required 
                                    onChange={(event) => setUsername(event.target.value)}
                                    className="px-4 py-2 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div className="flex flex-col gap-1 form-group">
                                <label htmlFor="password" className={`font-medium ${theme === "dark" ? "text-white" : "text-grey-800"}`}>Password:</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    required 
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="px-4 py-2 transition border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <Button 
                                type="primary" 
                                className="w-full px-6 py-2 mt-4 font-semibold text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                                onClick={loginUser}
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;