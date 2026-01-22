# Backend Setup Instructions

## Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

## Step 2: Set up OpenAI API Key
1. Get your API key from https://platform.openai.com/api-keys
2. Create a `.env` file in the `backend` folder:
```
PORT=5000
OPENAI_API_KEY=sk-your-api-key-here
NODE_ENV=development
```

## Step 3: Start the Backend Server
```bash
cd backend
npm run dev  # Uses nodemon for development
# or
npm start    # For production
```
The server should run on `http://localhost:5000`

## Step 4: Configure Frontend API URL
1. Create `.env` file in `StudentStudio/` folder
2. Add your backend URL (adjust based on your setup):
   - **Android Emulator**: `EXPO_PUBLIC_API_URL=http://10.0.2.2:5000`
   - **iOS Simulator**: `EXPO_PUBLIC_API_URL=http://localhost:5000`
   - **Physical Device**: `EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:5000`

## Step 5: Run Frontend
```bash
cd StudentStudio
npm install  # if axios not yet installed
npm start    # Expo development server
```

## Testing the Integration
1. Start the backend server
2. Start the frontend app
3. Go to the Mety AI tab
4. Type a message and send it - you should see the AI response!

## Notes
- The backend uses OpenAI's GPT-3.5-turbo model
- Conversation history is maintained on the frontend
- Each request times out after 30 seconds
- Make sure your OpenAI account has credits/payment method set up
