const API_URL = 'http://localhost:8000/api';

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }
    return response.json();
};

export const logoutUser = async () => {
    const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }
    return response.json();
};

export const checkAuth = async () => {
    const response = await fetch(`${API_URL}/check-auth`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Auth check failed');
    }
    return response.json();
};