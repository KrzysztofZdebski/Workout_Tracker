import { createContext, useState, useEffect } from "react";
import authApi from "./authApi"; // Adjust the import path as necessary

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        authApi.get("/auth/login")
            .then((response) => {
                setAuthenticated(true); // Set authenticated state based on the response
            })
            .catch(() => {
                setAuthenticated(false);
            })
            .finally(() => {
                setLoading(false); // Set loading to false once the API call is complete
            });
    }, []); // Empty dependency array to run only once on mount

    if (loading) {
        return <div></div>; // Render a loading indicator while checking authentication
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;