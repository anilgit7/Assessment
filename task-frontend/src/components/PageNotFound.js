// src/components/PageNotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {


    return (
        <div className="text-center mt-12">
            <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="mb-6">Oops! The page you are looking for does not exist.</p>
        </div>
    );
};

export default PageNotFound;
