import { createContext, useState, useEffect } from "react";
import authApi from "./authApi"; // Adjust the import path as necessary
import Loading from "../components/Loading";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const [refreshAuth, setRefreshAuth] = useState(false); // Add refresh state

    useEffect(() => {
        setLoading(true);
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
    }, [refreshAuth]); // Add refreshAuth to dependencies

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen"><Loading /></div>; // Render a loading indicator while checking authentication
    }

    // Expose setRefreshAuth so you can trigger a re-check from anywhere
    const triggerAuthCheck = () => setRefreshAuth(prev => !prev);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, triggerAuthCheck }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;