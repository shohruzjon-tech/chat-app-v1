import { io, Socket } from 'socket.io-client';
import { store } from '../store';
import { addMessage, updateMessageStatus, setTyping } from '../store/chatSlice';
import { Message } from '../store/chatSlice';

class WebSocketService {
  private socket: Socket | null = null;
  private readonly serverUrl = process.env.EXPO_PUBLIC_WEBSOCKET_URL || 'http://localhost:3000';

  connect(token: string) {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(this.serverUrl, {
      auth: {
        token,
      },
      transports: ['websocket'],
    });

    this.setupListeners();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('message:new', (message: Message) => {
      store.dispatch(addMessage(message));
    });

    this.socket.on('message:status', (data: { messageId: string; chatId: string; status: Message['status'] }) => {
      store.dispatch(updateMessageStatus(data));
    });

    this.socket.on('typing:start', (data: { chatId: string }) => {
      store.dispatch(setTyping({ chatId: data.chatId, isTyping: true }));
    });

    this.socket.on('typing:stop', (data: { chatId: string }) => {
      store.dispatch(setTyping({ chatId: data.chatId, isTyping: false }));
    });

    this.socket.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
    });
  }

  sendMessage(message: Omit<Message, 'id' | 'timestamp' | 'status'>) {
    if (!this.socket?.connected) {
      console.error('WebSocket not connected');
      return;
    }

    this.socket.emit('message:send', message);
  }

  sendTypingIndicator(chatId: string, isTyping: boolean) {
    if (!this.socket?.connected) {
      return;
    }

    this.socket.emit(isTyping ? 'typing:start' : 'typing:stop', { chatId });
  }

  updateMessageStatus(messageId: string, chatId: string, status: Message['status']) {
    if (!this.socket?.connected) {
      return;
    }

    this.socket.emit('message:status', { messageId, chatId, status });
  }

  joinChat(chatId: string) {
    if (!this.socket?.connected) {
      return;
    }

    this.socket.emit('chat:join', { chatId });
  }

  leaveChat(chatId: string) {
    if (!this.socket?.connected) {
      return;
    }

    this.socket.emit('chat:leave', { chatId });
  }
}

export default new WebSocketService();
