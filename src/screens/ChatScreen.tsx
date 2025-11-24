import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addMessage } from '../store/chatSlice';
import { theme } from '../theme';
import i18n from '../i18n';
import websocketService from '../services/websocket';
import encryptionService from '../services/encryption';

interface ChatScreenProps {
  route: any;
  navigation: any;
}

export default function ChatScreen({ route, navigation }: ChatScreenProps) {
  const { chatId } = route.params;
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const dispatch = useDispatch();

  const messages = useSelector((state: RootState) => state.chat.messages[chatId] || []);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Join chat room via WebSocket
    websocketService.joinChat(chatId);

    return () => {
      // Leave chat room on unmount
      websocketService.leaveChat(chatId);
    };
  }, [chatId]);

  const handleSend = () => {
    if (!inputText.trim() || !currentUser) return;

    const message = {
      chatId,
      senderId: currentUser.id,
      content: inputText.trim(),
      isEncrypted: true,
    };

    // Send via WebSocket
    websocketService.sendMessage(message);

    // Add to local state immediately for optimistic update
    dispatch(
      addMessage({
        id: 'temp-' + Date.now(),
        ...message,
        timestamp: Date.now(),
        status: 'sent',
      })
    );

    setInputText('');
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isOwn = item.senderId === currentUser?.id;

    return (
      <View style={[styles.messageContainer, isOwn && styles.ownMessageContainer]}>
        <View style={[styles.messageBubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
          <Text style={[styles.messageText, isOwn ? styles.ownText : styles.otherText]}>
            {item.content}
          </Text>
          <View style={styles.messageFooter}>
            <Text style={[styles.timestamp, isOwn && styles.ownTimestamp]}>
              {new Date(item.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            {isOwn && (
              <Text style={styles.status}>
                {item.status === 'read' ? '✓✓' : item.status === 'delivered' ? '✓✓' : '✓'}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{i18n.t('messages.noMessages')}</Text>
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('chat.typeMessage')}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    fontSize: theme.fontSize.xxl,
    color: theme.colors.textInverse,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textInverse,
  },
  placeholder: {
    width: 30,
  },
  messageList: {
    padding: theme.spacing.md,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: theme.spacing.sm,
    maxWidth: '80%',
  },
  ownMessageContainer: {
    alignSelf: 'flex-end',
  },
  messageBubble: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  ownBubble: {
    backgroundColor: theme.colors.chatBubbleOwn,
    borderTopRightRadius: theme.borderRadius.sm,
  },
  otherBubble: {
    backgroundColor: theme.colors.chatBubbleOther,
    borderTopLeftRadius: theme.borderRadius.sm,
    ...theme.shadows.sm,
  },
  messageText: {
    fontSize: theme.fontSize.md,
  },
  ownText: {
    color: theme.colors.chatBubbleOwnText,
  },
  otherText: {
    color: theme.colors.chatBubbleOtherText,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    justifyContent: 'flex-end',
  },
  timestamp: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.xs,
  },
  ownTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  status: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.read,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    maxHeight: 100,
    marginRight: theme.spacing.sm,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.round,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  emptyText: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
  },
});
