import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
  reactions?: { emoji: string; userId: string }[];
  isEncrypted?: boolean;
  replyTo?: string;
}

export interface Chat {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
  unreadCount: number;
  isTyping: boolean;
}

interface ChatState {
  chats: Chat[];
  messages: { [chatId: string]: Message[] };
  activeChat: string | null;
  searchQuery: string;
  isLoading: boolean;
}

const initialState: ChatState = {
  chats: [],
  messages: {},
  activeChat: null,
  searchQuery: '',
  isLoading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const { chatId } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(action.payload);
    },
    setMessages: (state, action: PayloadAction<{ chatId: string; messages: Message[] }>) => {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages;
    },
    updateMessageStatus: (
      state,
      action: PayloadAction<{ messageId: string; chatId: string; status: Message['status'] }>
    ) => {
      const { messageId, chatId, status } = action.payload;
      const message = state.messages[chatId]?.find((m) => m.id === messageId);
      if (message) {
        message.status = status;
      }
    },
    addReaction: (
      state,
      action: PayloadAction<{ messageId: string; chatId: string; emoji: string; userId: string }>
    ) => {
      const { messageId, chatId, emoji, userId } = action.payload;
      const message = state.messages[chatId]?.find((m) => m.id === messageId);
      if (message) {
        if (!message.reactions) {
          message.reactions = [];
        }
        message.reactions.push({ emoji, userId });
      }
    },
    setActiveChat: (state, action: PayloadAction<string | null>) => {
      state.activeChat = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setTyping: (state, action: PayloadAction<{ chatId: string; isTyping: boolean }>) => {
      const { chatId, isTyping } = action.payload;
      const chat = state.chats.find((c) => c.id === chatId);
      if (chat) {
        chat.isTyping = isTyping;
      }
    },
    incrementUnreadCount: (state, action: PayloadAction<string>) => {
      const chat = state.chats.find((c) => c.id === action.payload);
      if (chat) {
        chat.unreadCount += 1;
      }
    },
    resetUnreadCount: (state, action: PayloadAction<string>) => {
      const chat = state.chats.find((c) => c.id === action.payload);
      if (chat) {
        chat.unreadCount = 0;
      }
    },
  },
});

export const {
  setChats,
  addMessage,
  setMessages,
  updateMessageStatus,
  addReaction,
  setActiveChat,
  setSearchQuery,
  setTyping,
  incrementUnreadCount,
  resetUnreadCount,
} = chatSlice.actions;
export default chatSlice.reducer;
