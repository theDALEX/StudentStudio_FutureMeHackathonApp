# Student Studio 🎓

A comprehensive mobile app designed for university students to enhance their academic experience through three core areas:

## Features

### 📚 Study Hub
- **Course Management**: Track all your courses with progress indicators
- **Study Resources**: Access flashcards, video lectures, practice tests, and study groups
- **Quick Tools**: Pomodoro timer, note-taking, and schedule management
- **Academic Stats**: Monitor your study hours and grade averages

### 🤖 Mety AI
- **Personal Study Assistant**: AI-powered chatbot to help with academic questions
- **Subject Expertise**: Get explanations for complex topics across all subjects
- **Study Planning**: Generate personalized study schedules and plans
- **Quick Help**: Instant access to explanations, summaries, and practice questions

### 👥 Campus Social
- **University Community**: Connect with students from your university
- **Study Groups**: Find and join study groups for your courses
- **Campus Events**: Discover and participate in university events
- **Academic Networking**: Build connections with peers in your field

## Tech Stack
- **Framework**: React Native with Expo
- **Navigation**: Expo Router with tab-based navigation
- **Styling**: Custom theme system with light/dark mode support
- **Icons**: SF Symbols for consistent iconography
- **TypeScript**: Full type safety throughout the application

## Getting Started

1. Install dependencies:
   ```bash
   cd StudentStudio
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Use the Expo Go app to scan the QR code and run on your device

## App Structure

```
StudentStudio/
├── app/
│   └── (tabs)/
│       ├── index.tsx      # Study Hub
│       ├── explore.tsx    # Mety AI
│       ├── social.tsx     # Campus Social
│       └── _layout.tsx    # Tab navigation
├── components/            # Reusable UI components
├── constants/            # Theme and styling constants
└── hooks/               # Custom React hooks
```

## Design Philosophy

Student Studio is designed with a vibrant, engaging interface that appeals to university students. The app uses:

- **Colorful UI**: Purple and pink gradients with accent colors
- **Intuitive Navigation**: Clear tab structure for the three main areas
- **Student-Centric**: Features specifically designed for academic success
- **Modern Design**: Clean, contemporary interface with smooth interactions

## Future Enhancements

- Real-time chat functionality for Mety AI
- Integration with university systems
- Push notifications for assignments and events
- Offline study materials access
- Advanced analytics and insights