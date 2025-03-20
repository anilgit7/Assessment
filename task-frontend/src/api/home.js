const API_URL = 'http://localhost:8000/api';

export const getPosts = async (email, password) => {
    const response = await fetch(`${API_URL}/home`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error('Something Went Wrong');
    }
    return response.json();
};
