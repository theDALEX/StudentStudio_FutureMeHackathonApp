const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { OpenAI } = require('openai');

// Load .env file explicitly
const envPath = path.resolve(__dirname, '.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

// Get API key from environment only
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('❌ ERROR: OPENAI_API_KEY not found in .env file!');
  console.error('Please create a .env file with your OpenAI API key');
  process.exit(1);
}
console.log('OPENAI_API_KEY loaded:', apiKey ? 'YES ✓' : 'NO ✗');
console.log('PORT:', process.env.PORT || 5000);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: apiKey,
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mety AI Backend is running' });
});

// Chat endpoint - ChatGPT-like responses
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    console.log('📥 Received message:', message);

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build conversation history for context
    const messages = [
      {
        role: 'system',
        content: `You are Mety, a personal AI study assistant for students. You help students understand complex topics, create study plans, generate practice questions, and summarize content. Be friendly, encouraging, and provide clear explanations with examples when possible. Keep responses concise but informative.`
      },
      ...conversationHistory.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.message
      })),
      {
        role: 'user',
        content: message
      }
    ];

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResponse = response.choices[0].message.content;
    console.log('📤 Sending response:', aiResponse.substring(0, 100) + '...');

    res.json({
      success: true,
      message: aiResponse,
      timestamp: new Date().toLocaleTimeString(),
    });

  } catch (error) {
    console.error('❌ Backend Error:', error.message);
    res.status(500).json({
      error: 'Failed to get response from AI',
      details: error.message
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Mety AI Backend running on http://localhost:${port}`);
  console.log(`Make requests to http://localhost:${port}/api/chat`);
});
