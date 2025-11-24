export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  avatar?: string;
  bio?: string;
  lastSeen?: number;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
  reactions?: Reaction[];
  isEncrypted?: boolean;
  replyTo?: string;
  type?: 'text' | 'image' | 'video' | 'audio' | 'file';
  metadata?: MessageMetadata;
}

export interface Reaction {
  emoji: string;
  userId: string;
}

export interface MessageMetadata {
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  duration?: number;
  thumbnailUrl?: string;
}

export interface Chat {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
  unreadCount: number;
  isTyping: boolean;
  createdAt: number;
  updatedAt: number;
}

export type Language = 'uz' | 'en' | 'ru';

export interface NotificationData {
  chatId?: string;
  messageId?: string;
  senderId?: string;
  type: 'message' | 'call' | 'system';
}
