import { GoogleGenerativeAI } from '@google/generative-ai';

// Get Gemini API key from environment
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY!;

export interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  message: string;
  time: string;
  isLoading?: boolean;
}

class ChatService {
  private systemPrompt = `You are Mety, a helpful AI study assistant for university students. You help with:
- Explaining complex academic concepts
- Creating study schedules and plans
- Generating practice questions
- Providing study tips and techniques
- Helping with homework and assignments
- Offering academic guidance

Keep your responses helpful, encouraging, and student-focused. Use emojis occasionally to make conversations friendly.`;

  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  }

  async sendMessage(userMessage: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    try {
      // Get the Gemini model
      const model = this.genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      // Build conversation context
      let conversationContext = this.systemPrompt + "\n\n";

      // Add conversation history for context (last 10 messages to avoid token limits)
      const recentHistory = conversationHistory.slice(-10);
      if (recentHistory.length > 0) {
        conversationContext += "Previous conversation:\n";
        recentHistory.forEach(msg => {
          if (!msg.isLoading) {
            conversationContext += `${msg.type === 'user' ? 'Student' : 'Mety'}: ${msg.message}\n`;
          }
        });
        conversationContext += "\n";
      }

      conversationContext += `Student: ${userMessage}\nMety:`;

      // Generate response
      const result = await model.generateContent(conversationContext);
      const response = await result.response;
      const aiResponse = response.text();

      return aiResponse.trim();

    } catch (error: any) {
      console.error('Chat service error:', error);

      if (error.message?.includes('API_KEY')) {
        return "I'm sorry, but there's an issue with my AI service configuration. Please check the API key.";
      } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
        return "I'm currently experiencing high demand. Please try again in a moment! 😅";
      }

      return "I'm having trouble connecting right now. Please try again later! 🤖";
    }
  }

  // Helper method to generate study-related responses for demo purposes
  generateDemoResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('photosynthesis')) {
      return "Photosynthesis is the process plants use to convert sunlight into energy! 🌱 It happens in two main stages:\n\n1. Light-dependent reactions (in thylakoids)\n2. Light-independent reactions (Calvin cycle)\n\nWould you like me to explain each stage in detail?";
    } else if (lowerMessage.includes('study schedule') || lowerMessage.includes('study plan')) {
      return "I'd love to help you create a study schedule! 📅 Here's a great approach:\n\n1. List all your subjects and upcoming exams\n2. Allocate time based on difficulty and importance\n3. Include regular breaks (Pomodoro technique works great!)\n4. Schedule review sessions\n\nWhat subjects are you currently studying?";
    } else if (lowerMessage.includes('calculus') || lowerMessage.includes('derivative')) {
      return "Calculus can be tricky, but I'm here to help! 📊 Derivatives measure the rate of change of a function. Think of it like the speedometer in your car - it tells you how fast you're going at any moment.\n\nWhat specific calculus topic would you like me to explain?";
    } else if (lowerMessage.includes('practice questions') || lowerMessage.includes('quiz')) {
      return "Great idea! Practice questions are excellent for learning! 📝 I can help generate questions for any subject. Just tell me:\n\n1. What subject/topic?\n2. What difficulty level?\n3. What type of questions (multiple choice, short answer, etc.)?\n\nWhat would you like to practice?";
    } else if (lowerMessage.includes('quantum physics') || lowerMessage.includes('quantum')) {
      return "Quantum physics is fascinating! 🔬 It's the study of matter and energy at the smallest scales. Key concepts include:\n\n• Wave-particle duality\n• Uncertainty principle\n• Quantum superposition\n• Quantum entanglement\n\nWhich quantum concept would you like me to explain further?";
    } else if (lowerMessage.includes('biology') || lowerMessage.includes('bio')) {
      return "Biology is the study of life! 🧬 I can help with topics like:\n\n• Cell biology and genetics\n• Evolution and ecology\n• Human anatomy and physiology\n• Molecular biology\n\nWhat specific biology topic are you working on?";
    } else {
      return "That's an interesting question! 🤔 I'm here to help with your studies. Whether you need explanations, study plans, practice questions, or academic guidance, just let me know what you're working on and I'll do my best to assist you! 📚";
    }
  }
}

export const chatService = new ChatService();