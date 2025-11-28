// This file defines the API calls for the Admin Panel to the secure Safar Backend

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

// --- Types (Simplified for Admin Panel) ---
interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'provider' | 'admin';
    status: 'Active' | 'Suspended';
}

interface PriceAlert {
    _id: string;
    userEmail: string;
    route: string;
    targetPrice: number;
    currentPrice: number;
    status: 'Active' | 'Triggered' | 'Expired';
    type: 'Monitor' | 'Sniper';
}

// --- Helper Function ---
const fetchAdmin = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('adminToken'); // Assuming token is stored here after login
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
    };

    try {
        const response = await fetch(`${BACKEND_URL}/admin${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            // Handle specific errors like 401 Unauthorized
            if (response.status === 401) {
                console.error('Unauthorized access. Redirecting to login.');
                // In a real app, you would redirect to the login page
            }
            const errorData = await response.json();
            throw new Error(errorData.message || `API Error: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error('Backend API Error:', error);
        throw error;
    }
};

// --- User Management API ---

export const getUsers = async (): Promise<User[]> => {
    const data = await fetchAdmin('/users');
    return data.users;
};

export const updateUserStatus = async (userId: string, status: 'Active' | 'Suspended'): Promise<User> => {
    const data = await fetchAdmin(`/users/${userId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
    });
    return data.user;
};

export const deleteUser = async (userId: string): Promise<{ message: string }> => {
    return fetchAdmin(`/users/${userId}`, {
        method: 'DELETE',
    });
};

// --- Price Alert Management API ---

export const getPriceAlerts = async (): Promise<PriceAlert[]> => {
    const data = await fetchAdmin('/alerts');
    return data.alerts;
};

export const deactivateAlert = async (alertId: string): Promise<PriceAlert> => {
    const data = await fetchAdmin(`/alerts/${alertId}/deactivate`, {
        method: 'PUT',
    });
    return data.alert;
};

// --- Auth API (Simplified) ---

export const adminLogin = async (email: string, password: string): Promise<{ token: string, user: User }> => {
    const data = await fetchAdmin('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Authorization': '' } // No token needed for login
    });
    // Store token on successful login
    localStorage.setItem('adminToken', data.token);
    return data;
};
