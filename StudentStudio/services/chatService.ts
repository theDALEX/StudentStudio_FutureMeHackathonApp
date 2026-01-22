import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';

export interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  message: string;
  time: string;
}

export interface ChatResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

const axiosInstance = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatService = {
  // Send message to AI and get response
  async sendMessage(userMessage: string, conversationHistory: ChatMessage[]) {
    try {
      console.log('🔵 Sending message to:', API_ENDPOINTS.CHAT);
      console.log('Message:', userMessage);
      
      const response = await axiosInstance.post<ChatResponse>(
        API_ENDPOINTS.CHAT,
        {
          message: userMessage,
          conversationHistory: conversationHistory,
        }
      );

      console.log('🟢 Success:', response.data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('🔴 Chat API Error:', error);
      console.error('Error details:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to get response. Please try again.',
      };
    }
  },

  // Check API health
  async checkHealth() {
    try {
      await axiosInstance.get(API_ENDPOINTS.HEALTH);
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },
};
