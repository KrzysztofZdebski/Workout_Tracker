import React from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./authProvider"; // Import the AuthContext
import { useContext } from "react"; // Import useContext

function ProtectedRoute({children}) {
    const { isAuthenticated } = useContext(AuthContext); // Use the AuthContext
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;