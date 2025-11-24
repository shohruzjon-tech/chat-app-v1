import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setActiveChat } from '../store/chatSlice';
import { theme } from '../theme';
import i18n from '../i18n';

interface ChatListScreenProps {
  navigation: any;
}

export default function ChatListScreen({ navigation }: ChatListScreenProps) {
  const { chats } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  const handleChatPress = (chatId: string) => {
    dispatch(setActiveChat(chatId));
    navigation.navigate('Chat', { chatId });
  };

  const renderChatItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleChatPress(item.id)}
    >
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>
          {item.lastMessage?.senderId?.charAt(0).toUpperCase() || '?'}
        </Text>
      </View>
      <View style={styles.chatInfo}>
        <Text style={styles.chatName}>Chat {item.id}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage?.content || i18n.t('messages.noMessages')}
        </Text>
      </View>
      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat App</Text>
      </View>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{i18n.t('messages.noMessages')}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  headerTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textInverse,
  },
  listContent: {
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  avatarText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  lastMessage: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  unreadBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.round,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xs,
  },
  unreadText: {
    color: theme.colors.textInverse,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
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
