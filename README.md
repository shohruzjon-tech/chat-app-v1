# Chat App v1

A modern, feature-rich real-time chat application built with React Native (Expo), TypeScript, Redux, and WebSockets. Inspired by Telegram's clean UI and robust features.

## Features

### ✅ Implemented
- **Multi-platform Support**: Configured for iOS, Android, and Web
- **TypeScript**: Full TypeScript support with strict mode
- **Internationalization (i18n)**: Support for Uzbek (default), English, and Russian with dynamic language switching
- **State Management**: Redux Toolkit for efficient state management
- **Real-time Messaging**: WebSocket integration with Socket.io for instant message delivery
- **Telegram-inspired Theme**: Clean UI with blue accents and chat bubbles
- **Authentication**: Phone number authentication with SMS verification (Twilio placeholder)
- **End-to-End Encryption**: Placeholder implementation using crypto-js (AES encryption)
- **Push Notifications**: Expo Notifications setup for message alerts
- **Message Features**:
  - ✓ Read receipts
  - ✓ Message reactions (placeholder)
  - ✓ Message search (placeholder)
  - ✓ Typing indicators
  - ✓ Message status (sent/delivered/read)

### 📋 Project Structure

```
chat-app-v1/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── MessageBubble.tsx
│   │   └── TypingIndicator.tsx
│   ├── screens/          # App screens
│   │   ├── AuthScreen.tsx
│   │   ├── ChatListScreen.tsx
│   │   └── ChatScreen.tsx
│   ├── store/            # Redux store and slices
│   │   ├── index.ts
│   │   ├── authSlice.ts
│   │   └── chatSlice.ts
│   ├── i18n/             # Internationalization
│   │   ├── index.ts
│   │   └── translations.ts
│   ├── services/         # External services
│   │   ├── websocket.ts
│   │   ├── auth.ts
│   │   ├── encryption.ts
│   │   └── notifications.ts
│   ├── theme/            # App theming
│   │   └── index.ts
│   └── types/            # TypeScript type definitions
│       └── index.ts
├── assets/               # Images, fonts, icons
├── App.tsx              # Root component
├── app.json             # Expo configuration
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript configuration
├── .env.example         # Environment variables template
├── BACKEND_SETUP.md     # Backend setup guide
└── README.md            # This file
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shohruzjon-tech/chat-app-v1.git
   cd chat-app-v1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration (see Environment Variables section)

### Running the App

```bash
# Start Expo development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## Environment Variables

See `.env.example` for all required environment variables. Key configurations:

- `EXPO_PUBLIC_WEBSOCKET_URL`: WebSocket server URL
- `EXPO_PUBLIC_API_URL`: Backend API URL
- `EXPO_PUBLIC_PROJECT_ID`: Expo project ID for push notifications
- `EXPO_PUBLIC_ENCRYPTION_KEY`: Encryption key for E2EE

**Important**: Never commit sensitive credentials to version control!

## Backend Setup

The app requires a backend server for full functionality. See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed instructions on setting up the NestJS + MongoDB backend.

### Quick Backend Overview

- **Framework**: NestJS
- **Database**: MongoDB
- **WebSocket**: Socket.io
- **Authentication**: JWT + Twilio SMS
- **Features**: Real-time messaging, user management, message history, read receipts

## Technology Stack

### Frontend
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe code
- **Redux Toolkit**: State management
- **React Navigation**: Navigation library
- **Socket.io Client**: Real-time communication
- **i18n-js**: Internationalization
- **Expo Localization**: Device locale detection
- **Crypto-js**: Client-side encryption
- **Expo Notifications**: Push notifications

### Backend (See BACKEND_SETUP.md)
- **NestJS**: Server framework
- **MongoDB**: Database
- **Mongoose**: ODM
- **Socket.io**: WebSocket server
- **Twilio**: SMS authentication
- **JWT**: Token-based authentication

## Key Features Explained

### 1. Authentication
Phone number-based authentication with SMS verification:
- Enter phone number
- Receive SMS code (via Twilio)
- Verify code
- Get JWT token

### 2. Real-time Messaging
WebSocket connection for instant message delivery:
- Send/receive messages instantly
- Typing indicators
- Online/offline status
- Message read receipts

### 3. End-to-End Encryption
Messages are encrypted before sending:
- AES encryption using crypto-js
- Unique chat keys
- Client-side encryption/decryption

**Note**: Current implementation is a placeholder. For production, implement proper E2EE protocols like Signal Protocol.

### 4. Internationalization
Dynamic language switching:
- Uzbek (default)
- English
- Russian

Change language in app settings to switch between supported languages.

### 5. Push Notifications
Receive notifications for:
- New messages
- Message reactions
- System notifications

## Development Notes

### TypeScript Configuration
The project uses strict TypeScript mode for type safety:
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### Theme System
Telegram-inspired theme with customizable colors:
- Primary: `#0088cc` (Telegram blue)
- Chat bubbles: Own (blue) vs Others (white)
- Status colors for message states

### Redux Store Structure
- **auth**: User authentication state
- **chat**: Chat rooms and messages state

## Security Considerations

⚠️ **Important Security Notes**:

1. **Never expose Twilio credentials** in client-side code
2. Implement authentication on the backend
3. Use HTTPS/WSS in production
4. Validate all inputs
5. Implement rate limiting
6. Use proper E2EE protocols in production
7. Secure WebSocket connections
8. Implement proper token refresh mechanisms

## Roadmap

### Planned Features
- [ ] Voice/video calling
- [ ] Group chats
- [ ] File sharing (images, videos, documents)
- [ ] Message forwarding
- [ ] User profiles and settings
- [ ] Chat backup and restore
- [ ] Message deletion (for everyone)
- [ ] User blocking
- [ ] Dark mode
- [ ] Custom themes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue on GitHub
- Contact: shohruzjon.tech@gmail.com

## Acknowledgments

- Inspired by Telegram's clean and efficient design
- Built with Expo for rapid development
- Uses modern React Native best practices