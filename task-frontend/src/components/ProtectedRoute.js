import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../api/auth';
import { toastWarning } from '../utils/toastr';

function ProtectedRoute({ children }) {
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
        if (isAuthenticated === false) {
            toastWarning('Please login to access this route');
            // Delay redirect slightly to allow the toast to show
             // Adjust delay if needed
        }
    }, [isAuthenticated]);

    // if (isAuthenticated === null) return <div className="text-center mt-8">Loading...</div>;
    // return isAuthenticated ? children : <Navigate to="/login" replace />;

    if (isAuthenticated === null) {
        return <div className="text-center mt-8">Loading...</div>;
    }
    else {
        return isAuthenticated ? children : <Navigate to="/login" replace />;
    }
}

export default ProtectedRoute;