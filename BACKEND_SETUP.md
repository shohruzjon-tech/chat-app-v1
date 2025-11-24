# NestJS + MongoDB Backend Setup Guide

This guide provides instructions for setting up the backend server for the Chat App using NestJS and MongoDB.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Backend Architecture

The backend should include the following components:

### 1. Technology Stack
- **Framework**: NestJS
- **Database**: MongoDB with Mongoose ODM
- **WebSocket**: Socket.io
- **Authentication**: JWT (JSON Web Tokens)
- **SMS Service**: Twilio Verify API

### 2. Project Setup

```bash
# Create a new NestJS project
npx @nestjs/cli new chat-app-backend
cd chat-app-backend

# Install required dependencies
npm install @nestjs/mongoose mongoose
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install twilio
npm install bcrypt
npm install class-validator class-transformer

# Install dev dependencies
npm install --save-dev @types/bcrypt @types/passport-jwt
```

### 3. Database Schema

#### User Schema
```typescript
{
  phoneNumber: string; // unique, indexed
  name?: string;
  avatar?: string;
  bio?: string;
  lastSeen: Date;
  isOnline: boolean;
  encryptionPublicKey?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Chat Schema
```typescript
{
  participantIds: ObjectId[]; // reference to User
  lastMessage?: ObjectId; // reference to Message
  createdAt: Date;
  updatedAt: Date;
}
```

#### Message Schema
```typescript
{
  chatId: ObjectId; // reference to Chat
  senderId: ObjectId; // reference to User
  content: string; // encrypted content
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  reactions: [{ emoji: string, userId: ObjectId }];
  replyTo?: ObjectId; // reference to Message
  type: 'text' | 'image' | 'video' | 'audio' | 'file';
  metadata?: {
    fileUrl?: string;
    fileName?: string;
    fileSize?: number;
    duration?: number;
    thumbnailUrl?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### 4. Core Modules

#### Auth Module
- Phone number registration
- SMS verification with Twilio
- JWT token generation
- Token validation middleware

#### Chat Module
- Create chat room
- Get user chats
- Get chat messages
- Mark messages as read
- Search message history

#### WebSocket Gateway
- Real-time message delivery
- Typing indicators
- Online/offline status
- Message read receipts
- Message reactions

#### User Module
- Get user profile
- Update user profile
- Get user contacts

### 5. API Endpoints

```
POST /auth/send-code
Body: { phoneNumber: string }
Response: { success: boolean, message: string }

POST /auth/verify-code
Body: { phoneNumber: string, code: string }
Response: { success: boolean, token: string, user: User }

GET /users/me
Headers: { Authorization: Bearer <token> }
Response: { user: User }

GET /chats
Headers: { Authorization: Bearer <token> }
Response: { chats: Chat[] }

GET /chats/:chatId/messages
Headers: { Authorization: Bearer <token> }
Query: { page: number, limit: number }
Response: { messages: Message[], total: number }

POST /chats/:chatId/messages/read
Headers: { Authorization: Bearer <token> }
Body: { messageIds: string[] }
Response: { success: boolean }

GET /messages/search
Headers: { Authorization: Bearer <token> }
Query: { query: string, chatId?: string }
Response: { messages: Message[] }
```

### 6. WebSocket Events

**Client to Server:**
```
message:send - Send a new message
typing:start - Start typing indicator
typing:stop - Stop typing indicator
chat:join - Join a chat room
chat:leave - Leave a chat room
message:status - Update message status
```

**Server to Client:**
```
message:new - New message received
message:status - Message status update
typing:start - User started typing
typing:stop - User stopped typing
user:online - User came online
user:offline - User went offline
```

### 7. Environment Variables (.env)

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/chat-app

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d

# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_VERIFY_SERVICE_SID=your_verify_service_sid

# Server
PORT=3000
NODE_ENV=development

# CORS
ALLOWED_ORIGINS=http://localhost:19006,exp://localhost:19000
```

### 8. Security Considerations

1. **Never expose Twilio credentials in client-side code**
2. Implement rate limiting for SMS sending
3. Use HTTPS in production
4. Validate and sanitize all inputs
5. Implement proper CORS configuration
6. Use secure WebSocket connections (WSS) in production
7. Store encryption keys securely
8. Implement proper JWT token expiration and refresh

### 9. Running the Backend

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

### 10. Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### 11. Deployment

For production deployment, consider:
- MongoDB Atlas for database hosting
- AWS, Google Cloud, or Azure for server hosting
- Redis for WebSocket scaling (Socket.io adapter)
- PM2 for process management
- Nginx as reverse proxy
- SSL/TLS certificates

### 12. Additional Features to Implement

- [ ] File upload handling (images, videos, documents)
- [ ] Voice/video calling integration
- [ ] Message forwarding
- [ ] Chat groups
- [ ] User blocking
- [ ] Message deletion (for everyone)
- [ ] Chat backup and restore
- [ ] Admin panel
- [ ] Analytics and monitoring

## Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Socket.io Documentation](https://socket.io/docs/)
- [Twilio Verify API](https://www.twilio.com/docs/verify/api)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
