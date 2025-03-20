import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { handleResponse, toastError } from '../utils/toastr';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            handleResponse(response);
            if (response.success) {
                navigate('/dashboard');
            }
        } catch (err) {
            toastError('Login failed: ' + err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" >
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;