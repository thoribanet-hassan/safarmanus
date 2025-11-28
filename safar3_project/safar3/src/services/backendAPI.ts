/**
 * Backend API Service - UPDATED VERSION
 * خدمة مركزية للتواصل مع Backend الآمن
 */

import { API_ENDPOINTS, getAuthHeaders } from '../config/api';

/**
 * معالج الأخطاء المركزي
 */
const handleError = (endpoint: string, error: unknown): void => {
  console.error(`❌ [Backend Error] ${endpoint}:`, error);
  if (error instanceof Error) {
    console.error('Error details:', error.message);
  }
};

/**
 * طلب عام للـ Backend
 */
const backendRequest = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: unknown,
  requiresAuth: boolean = false
): Promise<T | null> => {
  try {
    const headers: Record<string, string> = requiresAuth
      ? getAuthHeaders()
      : { 'Content-Type': 'application/json' };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    handleError(url, error);
    return null;
  }
};

// ════════════════════════════════════════════════════════════
// Auth API
// ════════════════════════════════════════════════════════════

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: 'user' | 'provider';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const register = async (request: RegisterRequest): Promise<AuthResponse | null> => {
  console.log('📝 Registering user:', request.email);
  return backendRequest<AuthResponse>(API_ENDPOINTS.AUTH_REGISTER, 'POST', request);
};

export const login = async (request: LoginRequest): Promise<AuthResponse | null> => {
  console.log('🔐 Logging in:', request.email);
  return backendRequest<AuthResponse>(API_ENDPOINTS.AUTH_LOGIN, 'POST', request);
};

export const getProfile = async (): Promise<any | null> => {
  console.log('👤 Getting profile');
  return backendRequest<any>(API_ENDPOINTS.AUTH_PROFILE, 'GET', undefined, true);
};

// ════════════════════════════════════════════════════════════
// Flight Search API
// ════════════════════════════════════════════════════════════

export interface FlightSearchRequest {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
  cabinClass?: string;
}

export interface SmartSearchRequest {
  query: string;
}

export const searchFlights = async (request: FlightSearchRequest): Promise<any | null> => {
  console.log('🔍 Searching flights:', request);
  return backendRequest<any>(API_ENDPOINTS.FLIGHT_SEARCH, 'POST', request);
};

export const smartSearchFlights = async (request: SmartSearchRequest): Promise<any | null> => {
  console.log('🧠 Smart searching flights:', request.query);
  return backendRequest<any>(API_ENDPOINTS.FLIGHT_SMART_SEARCH, 'POST', request);
};

// ════════════════════════════════════════════════════════════
// Price Alerts API
// ════════════════════════════════════════════════════════════

export interface CreateAlertRequest {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  targetPrice: number;
  passengers?: number;
  cabinClass?: string;
}

export const createAlert = async (request: CreateAlertRequest): Promise<any | null> => {
  console.log('🔔 Creating alert:', request);
  return backendRequest<any>(API_ENDPOINTS.ALERTS, 'POST', request, true);
};

export const getAlerts = async (): Promise<any | null> => {
  console.log('📊 Fetching alerts');
  return backendRequest<any>(API_ENDPOINTS.ALERTS, 'GET', undefined, true);
};

export const deleteAlert = async (alertId: string): Promise<any | null> => {
  console.log('🗑️ Deleting alert:', alertId);
  return backendRequest<any>(`${API_ENDPOINTS.ALERTS}/${alertId}`, 'DELETE', undefined, true);
};

export const updateAlert = async (alertId: string, updates: Partial<CreateAlertRequest>): Promise<any | null> => {
  console.log('✏️ Updating alert:', alertId);
  return backendRequest<any>(`${API_ENDPOINTS.ALERTS}/${alertId}`, 'PUT', updates, true);
};

// ════════════════════════════════════════════════════════════
// Chat/AI API
// ════════════════════════════════════════════════════════════

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  response: string;
}

export const sendChatMessage = async (request: ChatRequest): Promise<ChatResponse | null> => {
  console.log('💬 Sending chat message');
  return backendRequest<ChatResponse>(API_ENDPOINTS.CHAT, 'POST', request);
};

// ════════════════════════════════════════════════════════════
// Helper Functions
// ════════════════════════════════════════════════════════════

export const NO_RESULTS_MESSAGE = 'ما لقينا رحلات تناسب بحثك… تبي بدائل؟';

/**
 * التحقق من اتصال Backend
 */
export const checkBackendConnection = async (): Promise<boolean> => {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const response = await fetch(`${backendUrl}/health`);
    return response.ok;
  } catch (error) {
    console.error('❌ Backend not reachable:', error);
    return false;
  }
};
