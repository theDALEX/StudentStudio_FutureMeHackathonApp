# OpenAI Integration Setup Guide

## Overview
The Mety AI chat feature is ready to connect to OpenAI's GPT-3.5-turbo model. Currently, it uses demo responses, but you can easily enable real AI chat by following these steps.

## Setup Instructions

### 1. Get an OpenAI API Key
1. Go to [OpenAI's website](https://openai.com)
2. Sign up or log in to your account
3. Navigate to the API section
4. Generate a new API key
5. Copy the API key (it starts with `sk-`)

### 2. Configure the API Key
1. Open `services/chatService.ts`
2. Find the line: `const OPENAI_API_KEY = 'your-openai-api-key-here';`
3. Replace `'your-openai-api-key-here'` with your actual API key
4. Save the file

### 3. Test the Integration
1. Run the app: `npm start`
2. Navigate to the Mety AI tab
3. Try asking a question
4. You should now get real AI responses!

## Demo Mode
When the API key is not configured (default), the app uses intelligent demo responses that cover common student topics:
- Photosynthesis explanations
- Study schedule creation
- Calculus help
- Practice question generation
- Quantum physics basics
- Biology topics

## Features
- **Real-time Chat**: Send messages and get AI responses
- **Context Awareness**: AI remembers conversation history
- **Student-Focused**: Optimized for academic assistance
- **Error Handling**: Graceful fallbacks for network issues
- **Loading States**: Visual feedback during API calls

## Security Notes
- Never commit API keys to version control
- For production apps, use environment variables
- Consider implementing rate limiting
- Monitor API usage and costs

## Troubleshooting
- **"Setup" button**: Click to see setup instructions
- **Demo responses**: Means API key is not configured
- **Connection errors**: Check internet connection and API key validity
- **Rate limits**: OpenAI has usage limits, wait and try again

## API Costs
- GPT-3.5-turbo is very affordable
- Typical student conversations cost fractions of a penny
- Monitor usage in your OpenAI dashboard