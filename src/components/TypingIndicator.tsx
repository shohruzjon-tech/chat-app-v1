import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import i18n from '../i18n';

interface TypingIndicatorProps {
  isVisible: boolean;
}

export default function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
        </View>
      </View>
      <Text style={styles.text}>{i18n.t('chat.typing')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    maxWidth: '80%',
  },
  bubble: {
    backgroundColor: theme.colors.chatBubbleOther,
    borderRadius: theme.borderRadius.lg,
    borderTopLeftRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    ...theme.shadows.sm,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.textSecondary,
    marginHorizontal: 2,
  },
  dot1: {
    // Animation would be added here in a more complete implementation
  },
  dot2: {
    // Animation would be added here in a more complete implementation
  },
  dot3: {
    // Animation would be added here in a more complete implementation
  },
  text: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
  },
});
