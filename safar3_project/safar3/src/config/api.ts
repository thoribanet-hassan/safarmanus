/**
 * API Configuration Module - SECURE VERSION
 * 
 * SECURITY: All API keys are now handled by the backend.
 * The frontend only communicates with our secure backend API.
 */

// Backend API URL - the ONLY external endpoint the frontend should call
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

// Backend API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: `${BACKEND_URL}/auth/register`,
  AUTH_LOGIN: `${BACKEND_URL}/auth/login`,
  AUTH_PROFILE: `${BACKEND_URL}/auth/profile`,
  
  // Flights
  FLIGHT_SEARCH: `${BACKEND_URL}/flights/search`,
  FLIGHT_SMART_SEARCH: `${BACKEND_URL}/flights/smart-search`,
  
  // Alerts
  ALERTS: `${BACKEND_URL}/alerts`,
  
  // Chat
  CHAT: `${BACKEND_URL}/chat`,
};

// Helper to get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper to set auth token
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Helper to remove auth token
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Helper to get auth headers
export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
