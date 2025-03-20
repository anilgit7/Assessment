import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Fixed import
import { logoutUser, checkAuth } from '../api/auth';
import { handleResponse, toastError } from '../utils/toastr';

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); 
    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const data = await checkAuth();
                setIsAuthenticated(data.authenticated);
                setName(data.name || 'User'); 
                setEmail(data.email);
            } catch (err) {
                setIsAuthenticated(false);
                setName(null);
                setEmail(null);
            }
        };
        verifyAuth();
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            const response = await logoutUser();
            handleResponse(response);
            setIsAuthenticated(false);
            setName(null);
            setEmail(null);
            setDropdownOpen(false);
            navigate('/login');
        } catch (err) {
            toastError('Logout failed: ' + err.message);
        }
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="navbar-left">
                <Link to="/" className="text-lg font-semibold hover:text-gray-300">
                    Home
                </Link>
            </div>
            <div className="navbar-right flex items-center gap-4">
                {isAuthenticated ? (
                    <div className="relative">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
                            <svg className="w-6 h-6 text-white hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-10">
                                <div className="px-4 py-2 border-b">
                                    <p className="font-semibold">{name}</p>
                                    <p className="text-sm text-gray-600">{email}</p>
                                </div>
                                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="text-lg font-semibold hover:text-gray-300">
                            Login
                        </Link>
                        <Link to="/signup" className="text-lg font-semibold hover:text-gray-300">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
      );
}

export default Navbar;