# Chat App v1 - Project Structure

## Overview
This document provides a comprehensive overview of the project structure and architecture.

## Directory Structure

```
chat-app-v1/
├── src/                          # Source code directory
│   ├── components/               # Reusable UI components
│   │   ├── MessageBubble.tsx    # Chat message bubble component
│   │   └── TypingIndicator.tsx  # Typing indicator animation
│   │
│   ├── screens/                  # Application screens
│   │   ├── AuthScreen.tsx       # Phone authentication screen
│   │   ├── ChatListScreen.tsx   # List of all chats
│   │   ├── ChatScreen.tsx       # Individual chat conversation
│   │   └── SettingsScreen.tsx   # App settings and language selection
│   │
│   ├── store/                    # Redux state management
│   │   ├── index.ts             # Store configuration
│   │   ├── authSlice.ts         # Authentication state slice
│   │   ├── chatSlice.ts         # Chat and messages state slice
│   │   └── hooks.ts             # Typed Redux hooks
│   │
│   ├── i18n/                     # Internationalization
│   │   ├── index.ts             # i18n configuration
│   │   └── translations.ts      # Translation strings (uz, en, ru)
│   │
│   ├── services/                 # External services and APIs
│   │   ├── websocket.ts         # WebSocket service (Socket.io)
│   │   ├── auth.ts              # Authentication service (Twilio)
│   │   ├── encryption.ts        # Encryption service (crypto-js)
│   │   └── notifications.ts     # Push notifications service
│   │
│   ├── theme/                    # Application theming
│   │   └── index.ts             # Theme configuration (colors, spacing, etc.)
│   │
│   └── types/                    # TypeScript type definitions
│       └── index.ts             # Shared type definitions
│
├── assets/                       # Static assets
│   ├── icon.png                 # App icon
│   ├── splash-icon.png          # Splash screen
│   ├── adaptive-icon.png        # Android adaptive icon
│   └── favicon.png              # Web favicon
│
├── App.tsx                       # Root application component
├── index.ts                      # Application entry point
├── app.json                      # Expo configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── .gitignore                    # Git ignore rules
├── .env.example                  # Environment variables template
├── README.md                     # Main documentation
├── BACKEND_SETUP.md              # Backend setup guide
└── PROJECT_STRUCTURE.md          # This file
```

## Key Files and Their Purposes

### Root Files

#### `App.tsx`
- Root component of the application
- Sets up Redux Provider
- Configures React Navigation
- Manages WebSocket and notification initialization
- Handles authentication routing

#### `index.ts`
- Application entry point
- Registers the root component

#### `app.json`
- Expo configuration file
- Defines app metadata (name, version, icons)
- Platform-specific configurations (iOS, Android)
- Plugin configurations (expo-notifications)

#### `tsconfig.json`
- TypeScript compiler configuration
- Extends Expo's base config
- Enables strict mode for type safety

### Source Code (`src/`)

#### Components (`src/components/`)

**MessageBubble.tsx**
- Displays individual chat messages
- Supports own/other message styling
- Shows timestamp and read receipts
- Displays message reactions
- Handles message interactions (press, long press)

**TypingIndicator.tsx**
- Animated typing indicator
- Shows when other user is typing
- Telegram-style three-dot animation

#### Screens (`src/screens/`)

**AuthScreen.tsx**
- Phone number input form
- SMS verification code input
- Integration with auth service
- Manages authentication flow

**ChatListScreen.tsx**
- Displays all user chats
- Shows last message and unread count
- Navigation to individual chats
- Settings button access

**ChatScreen.tsx**
- Individual chat conversation view
- Message list with auto-scroll
- Message input field
- Real-time message updates via WebSocket
- Typing indicator support
- Message encryption/decryption

**SettingsScreen.tsx**
- Language selection (Uzbek, English, Russian)
- Notification settings (placeholder)
- Privacy settings (placeholder)
- Security settings display

#### Store (`src/store/`)

**index.ts**
- Redux store configuration
- Combines all reducers
- Exports typed hooks

**authSlice.ts**
- Authentication state management
- User data and token storage
- Login/logout actions
- Loading and error states

**chatSlice.ts**
- Chat rooms state
- Messages storage per chat
- Active chat tracking
- Search query state
- Typing indicators
- Unread message counts
- Message status updates
- Reaction management

**hooks.ts**
- Typed Redux hooks
- `useAppDispatch` for dispatching actions
- `useAppSelector` for selecting state

#### i18n (`src/i18n/`)

**index.ts**
- i18n-js configuration
- Locale detection and initialization
- Language switching functions
- Fallback language setup

**translations.ts**
- Translation strings for all supported languages
- Organized by feature (auth, chat, messages, settings)
- Supports Uzbek, English, and Russian

#### Services (`src/services/`)

**websocket.ts**
- Socket.io client setup
- Real-time message delivery
- Event listeners for:
  - New messages
  - Message status updates
  - Typing indicators
  - Connection management
- Message sending
- Chat room join/leave

**auth.ts**
- Phone authentication via Twilio (placeholder)
- SMS code verification
- JWT token management
- User session handling
- API communication helpers

**encryption.ts**
- End-to-end encryption service
- AES encryption/decryption
- Chat key generation
- Hash functions
- Security utilities

**notifications.ts**
- Expo Notifications setup
- Push notification permissions
- Token management
- Notification scheduling
- Badge count management
- Notification event listeners

#### Theme (`src/theme/`)

**index.ts**
- Telegram-inspired color palette
- Spacing system
- Border radius values
- Font sizes and weights
- Shadow styles
- Consistent design tokens

#### Types (`src/types/`)

**index.ts**
- Shared TypeScript interfaces
- User, Message, Chat types
- Notification data types
- Language types

## State Management Architecture

### Redux Store Structure

```typescript
{
  auth: {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null
  },
  chat: {
    chats: Chat[],
    messages: { [chatId: string]: Message[] },
    activeChat: string | null,
    searchQuery: string,
    isLoading: boolean
  }
}
```

## Service Layer Architecture

### WebSocket Service
- Singleton pattern
- Auto-reconnection
- Event-based communication
- Redux integration for state updates

### Auth Service
- Placeholder for server-side authentication
- Mock API calls for demonstration
- Token management
- User session handling

### Encryption Service
- Client-side encryption
- AES algorithm
- Key generation
- Placeholder for proper E2EE

### Notification Service
- Push token management
- Notification scheduling
- Badge management
- Event handling

## Navigation Flow

```
Auth Flow:
AuthScreen
  → Login with phone
  → Verify SMS code
  → ChatListScreen

Main Flow:
ChatListScreen
  ├── → ChatScreen (individual chat)
  └── → SettingsScreen
      └── Language selection
```

## Data Flow

```
User Action
  → Dispatch Redux Action
  → Update Local State
  → Call Service (WebSocket/API)
  → Receive Response
  → Update Redux State
  → UI Re-renders
```

## Build and Development

### Scripts
```bash
npm start      # Start Expo dev server
npm run ios    # Run on iOS simulator
npm run android # Run on Android emulator
npm run web    # Run in web browser
```

### TypeScript Compilation
```bash
npx tsc --noEmit  # Type checking without build
```

### Testing
- No test infrastructure currently
- Can add Jest + React Native Testing Library

## Environment Configuration

### Required Environment Variables
See `.env.example` for all variables:
- WebSocket server URL
- API endpoint
- Twilio credentials (server-side only)
- Encryption keys
- Expo project ID

## Platform Support

### iOS
- Configured in `app.json`
- Bundle identifier: `com.shohruzjon.chatappv1`
- Supports tablets
- SMS permissions required

### Android
- Configured in `app.json`
- Package name: `com.shohruzjon.chatappv1`
- Adaptive icon configured
- SMS permissions in manifest
- Edge-to-edge display

### Web
- Expo web support
- Limited functionality (no SMS, limited notifications)

## Security Considerations

1. **Never commit `.env` to version control**
2. **Server-side authentication** required for production
3. **HTTPS/WSS** in production
4. **Proper E2EE** protocol needed (Signal Protocol)
5. **Input validation** on all user inputs
6. **Rate limiting** for SMS sending
7. **Secure token storage** (encrypted storage)

## Future Enhancements

### Planned Features
- Group chats
- Voice/video calls
- File sharing
- Message forwarding
- User profiles
- Dark mode
- Custom themes
- Message backup

### Technical Improvements
- Proper E2EE implementation
- Offline message queue
- Message pagination
- Image compression
- Voice message recording
- Video streaming
- File upload progress
- Connection status indicator

## Dependencies Overview

### Core Dependencies
- **expo**: Development platform
- **react-native**: Mobile framework
- **typescript**: Type safety
- **@reduxjs/toolkit**: State management
- **socket.io-client**: Real-time communication
- **i18n-js**: Internationalization
- **crypto-js**: Encryption

### Navigation
- **@react-navigation/native**: Navigation framework
- **@react-navigation/stack**: Stack navigator

### Expo Modules
- **expo-localization**: Device locale
- **expo-notifications**: Push notifications
- **expo-status-bar**: Status bar styling

## Maintenance

### Updating Dependencies
```bash
npx expo install --fix  # Fix version compatibility
npm update              # Update packages
```

### Code Quality
- TypeScript strict mode enabled
- Follow existing code patterns
- Maintain component modularity
- Keep services decoupled

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Socket.io Documentation](https://socket.io/docs/)
