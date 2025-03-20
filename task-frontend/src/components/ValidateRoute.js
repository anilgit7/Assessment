import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../api/auth';
import { toastWarning } from '../utils/toastr';

const ValidateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const data = await checkAuth();
                setIsAuthenticated(data.authenticated);
            }
            catch (err) {
                setIsAuthenticated(false);
            }
        };
        verifyAuth();
    }, []);
    
    useEffect(() => {
        if (isAuthenticated === true) {
            toastWarning('You are already logged in');
        }
    }, [isAuthenticated]);


    if (isAuthenticated === null) {
        return <div className="text-center mt-8">Loading...</div>;
    }
    else {
        return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
    }
}

export default ValidateRoute