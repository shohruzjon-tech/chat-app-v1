import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

interface MessageBubbleProps {
  content: string;
  timestamp: number;
  isOwn: boolean;
  status?: 'sent' | 'delivered' | 'read';
  reactions?: { emoji: string; userId: string }[];
  onPress?: () => void;
  onLongPress?: () => void;
}

export default function MessageBubble({
  content,
  timestamp,
  isOwn,
  status = 'sent',
  reactions = [],
  onPress,
  onLongPress,
}: MessageBubbleProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isOwn && styles.ownContainer]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <View style={[styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        <Text style={[styles.text, isOwn ? styles.ownText : styles.otherText]}>{content}</Text>
        <View style={styles.footer}>
          <Text style={[styles.timestamp, isOwn && styles.ownTimestamp]}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
          {isOwn && (
            <Text style={[styles.status, status === 'read' && styles.readStatus]}>
              {status === 'read' ? '✓✓' : status === 'delivered' ? '✓✓' : '✓'}
            </Text>
          )}
        </View>
      </View>
      {reactions.length > 0 && (
        <View style={styles.reactions}>
          {reactions.slice(0, 3).map((reaction, index) => (
            <Text key={index} style={styles.reactionEmoji}>
              {reaction.emoji}
            </Text>
          ))}
          {reactions.length > 3 && <Text style={styles.reactionCount}>+{reactions.length - 3}</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.sm,
    maxWidth: '80%',
  },
  ownContainer: {
    alignSelf: 'flex-end',
  },
  bubble: {
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
  text: {
    fontSize: theme.fontSize.md,
  },
  ownText: {
    color: theme.colors.chatBubbleOwnText,
  },
  otherText: {
    color: theme.colors.chatBubbleOtherText,
  },
  footer: {
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
    color: theme.colors.sent,
  },
  readStatus: {
    color: theme.colors.read,
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    backgroundColor: theme.colors.reactionBackground,
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  reactionEmoji: {
    fontSize: theme.fontSize.sm,
    marginRight: 2,
  },
  reactionCount: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginLeft: 2,
  },
});
