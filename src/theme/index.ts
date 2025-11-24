// Telegram-inspired theme with blue accents
export const theme = {
  colors: {
    // Primary colors - Telegram blue
    primary: '#0088cc',
    primaryDark: '#006699',
    primaryLight: '#4fa3d1',
    
    // Background colors
    background: '#ffffff',
    backgroundSecondary: '#f5f5f5',
    backgroundTertiary: '#e8e8e8',
    
    // Chat bubble colors
    chatBubbleOwn: '#0088cc',
    chatBubbleOther: '#ffffff',
    chatBubbleOwnText: '#ffffff',
    chatBubbleOtherText: '#000000',
    
    // Text colors
    text: '#000000',
    textSecondary: '#6d6d72',
    textTertiary: '#999999',
    textInverse: '#ffffff',
    
    // Status colors
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    
    // Message status
    sent: '#999999',
    delivered: '#0088cc',
    read: '#4caf50',
    
    // UI elements
    border: '#e0e0e0',
    divider: '#eeeeee',
    shadow: 'rgba(0, 0, 0, 0.1)',
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    // Online status
    online: '#4caf50',
    offline: '#999999',
    
    // Reactions
    reactionBackground: '#f0f0f0',
    reactionSelected: '#0088cc',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    round: 999,
  },
  
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

export type Theme = typeof theme;
