import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleResponse, toastError, toastSuccess } from '../utils/toastr';
import axios from 'axios';
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate if passwords match
        if (password !== confirmPassword) {
            toastError('Passwords do not match.');
            return;
        }

        try {
    const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            confirmPassword,
        }),
        credentials: "include", // If your API requires cookies/sessions
    });

    const data = await response.json();

    if (response.ok) {
        toastSuccess("User registered successfully!");
        navigate('/login');
    } else {
        throw new Error(data.message || "Sign Up failed");
    }
} catch (err) {
    toastError("Sign Up failed: " + err.message);
}

    };

    return (
        <div className="max-w-md mx-auto mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Sign Up
                </button>

            </form>
            <p className="pt-[5rem]">Sign up form is not done yet.</p>
        </div>
    )
}

export default SignUp