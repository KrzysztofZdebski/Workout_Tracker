import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "./authProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; // Or a loading spinner
  return children;
};

export default ProtectedRoute;