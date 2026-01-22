# 🎓 Student Studio

**Your Ultimate Academic Companion**

Student Studio is a comprehensive mobile application designed to enhance the university experience by providing students with powerful tools for learning, collaboration, and academic success. Built with React Native and Expo, this app combines AI-powered assistance, social networking, and study management in one seamless platform.

## ✨ Features

### 🤖 **Mety AI Assistant**
- **Intelligent Study Helper**: Get personalized explanations, study plans, and academic guidance
- **Powered by Google Gemini**: Advanced AI technology for accurate and helpful responses
- **Conversational Interface**: Natural chat experience with context-aware responses
- **Academic Focus**: Specialized in helping with coursework, concepts, and study strategies

### 📚 **Study Hub**
- **Course Management**: Track multiple courses with progress indicators
- **Study Statistics**: Monitor your learning journey with detailed analytics
- **Quick Study Tools**: Access Pomodoro timer, notes, and scheduling tools
- **Resource Library**: Organized study materials and academic resources

### 📖 **Interactive Study Materials**
- **Comprehensive Content**: Lectures, research papers, assignments, and quizzes
- **Smart Organization**: Filter by content type, difficulty, and subject
- **Progress Tracking**: Visual indicators for completion status
- **AI Summarization**: Generate intelligent summaries of study materials
- **Personal Notes**: Add and manage your own study notes
- **Multiple Formats**: Support for videos, PDFs, code examples, and more

### 🌐 **Campus Social Network**
- **University Feed**: Connect with classmates and share academic experiences
- **Study Groups**: Find and join collaborative learning sessions
- **Campus Groups**: Participate in clubs and organizations
- **Friend Discovery**: Connect with students in your courses and interests

### 🎉 **Campus Events**
- **Event Discovery**: Browse academic, social, sports, career, and cultural events
- **Smart Filtering**: Find events by category, date, and location
- **RSVP System**: Join events with one-tap attendance tracking
- **Real-time Updates**: Live attendance counters and capacity management
- **Event Categories**: Academic workshops, social gatherings, career fairs, and more

### 👤 **Personal Profile**
- **Academic Progress**: Track your grades, study hours, and achievements
- **Customizable Profile**: Showcase your interests, hobbies, and academic focus
- **Statistics Dashboard**: Comprehensive overview of your academic journey
- **Settings & Preferences**: Personalize your app experience

## 🛠 Technology Stack

- **Frontend**: React Native with Expo
- **Navigation**: Expo Router with file-based routing
- **AI Integration**: Google Gemini API
- **Styling**: Custom themed components with consistent design system
- **State Management**: React Hooks and Context
- **TypeScript**: Full type safety and better development experience

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FutureMeHackathonApp/StudentStudio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API key to the `.env` file:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on your device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or run on simulator: `npx expo start --ios` or `npx expo start --android`

## 📱 App Structure

```
app/
├── (tabs)/                 # Tab-based navigation
│   ├── index.tsx          # Study Hub (Home)
│   ├── metyAi.tsx         # AI Assistant Chat
│   ├── social.tsx         # Campus Social Feed
│   └── profile.tsx        # User Profile
├── events.tsx             # Campus Events
├── moduleExample.tsx      # Study Materials List
├── specificmoduleExample.tsx # Detailed Study View
└── _layout.tsx           # Root layout configuration

components/
├── themed-text.tsx        # Themed text component
├── themed-view.tsx        # Themed view component
└── ui/                    # UI components

services/
└── chatService.ts         # AI chat service integration
```

## 🎨 Design System

Student Studio features a cohesive design system with:
- **Consistent Color Palette**: Primary, secondary, accent colors with light/dark theme support
- **Typography**: Hierarchical text styles for optimal readability
- **Component Library**: Reusable themed components
- **Responsive Layout**: Optimized for various screen sizes
- **Intuitive Navigation**: Tab-based navigation with clear visual hierarchy

## 🔧 Configuration

### Environment Variables
- `EXPO_PUBLIC_GEMINI_API_KEY`: Your Google Gemini API key for AI functionality

### Customization
- Modify `constants/theme.ts` to customize colors and styling
- Update `services/chatService.ts` to adjust AI behavior and prompts
- Extend components in `components/` directory for additional functionality

## 📊 Key Features in Detail

### AI-Powered Study Assistant
- Context-aware conversations that remember your academic focus
- Specialized prompts for different types of academic help
- Integration with study materials for enhanced learning

### Comprehensive Study Management
- Multi-format content support (lectures, research, assignments)
- Progress tracking with visual indicators
- Smart categorization and filtering
- Personal note-taking system

### Social Learning Platform
- University-specific social feed
- Study group formation and management
- Event discovery and participation
- Academic networking opportunities

## 🤝 Contributing

We welcome contributions to Student Studio! Please feel free to submit issues, feature requests, or pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev) and [React Native](https://reactnative.dev)
- AI powered by [Google Gemini](https://ai.google.dev)
- Icons from [SF Symbols](https://developer.apple.com/sf-symbols/)

## 📞 Support

For support, questions, or feedback, please contact the development team or create an issue in the repository.

---

**Student Studio** - Empowering students to achieve academic excellence through intelligent technology and collaborative learning. 🎓✨
