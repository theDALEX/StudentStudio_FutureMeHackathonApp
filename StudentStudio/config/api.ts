// API Configuration
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  CHAT: `${API_BASE_URL}/api/chat`,
  HEALTH: `${API_BASE_URL}/api/health`,
};
